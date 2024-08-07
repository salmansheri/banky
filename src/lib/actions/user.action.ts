"use server";

import { z } from "zod";
import { SignInFormSchema } from "../validation/sign-in";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { auth, signIn } from "../auth";
import {
  AccountType,
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid/plaid";
import { encryptId, parseStringify } from "../utils";

const getHashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

type SignInFormSchemaType = z.infer<ReturnType<typeof SignInFormSchema>>;
export async function createUser(userData: any): Promise<SignInFormSchemaType> {
  try {
    const dbPassword = getHashedPassword(userData.password);
    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        address1: userData.address,
        email: userData.email,
        password: dbPassword,
        city: userData.city,
        state: userData.state,
        postalcode: userData.postalCode,
        ssn: userData.ssn,
      },
    });
    // @ts-ignore
    return newUser;
  } catch (error) {
    console.log(`prisma create error: ${error}`);
    // @ts-ignore
    return error;
  }
}

export async function signInUser(email?: string, password?: string) {
  try {
    const userSignIn = await signIn("credentials", {
      email,
      password,
    });

    if (userSignIn) {
      console.log("logged in");
    }

    return userSignIn;
  } catch (error) {
    console.log(`auth error: ${error}`);
    return error;
  }
}

export type CurrentUserType = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function getCurrentUser() {
  try {
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    const currentUser: CurrentUserType = {
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
    };

    return currentUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createLinkToken(user: User) {
  try {
    const tokenParams = {
      user: {
        client_user_id: user?.id,
      },
      client_name: `${user?.firstName} ${user?.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify(response);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function exchangePublicToken({
  publicToken,
  user,
}: exchangePublicTokenProps) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);

    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer Id, processor token, and bank name

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    await createBankAccount({
      userId: user.id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });
  } catch (error) {
    console.log(`An Error occured while creating exchanging token: ${error}`);
    return error;
  }
}
