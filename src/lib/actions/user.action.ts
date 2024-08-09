"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products
} from "plaid";
import { z } from "zod";
import { auth } from "../auth";
import prisma from "../db";
import { plaidClient } from "../plaid/plaid";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { SignInFormSchema } from "../validation/sign-in";
import { createBankAccount } from "./bankaccount.actions";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const getHashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

type SignInFormSchemaType = z.infer<ReturnType<typeof SignInFormSchema>>;
export async function createUser(userData: any): Promise<SignInFormSchemaType> {
  try {
    const dbPassword = getHashedPassword(userData.password);

    const dwollaCustomerUrl = await createDwollaCustomer({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      address1: userData?.address,
      city: userData?.city,
      dateOfBirth: userData.dateOfBirth,
      postalCode: userData?.postalCode,
      ssn: userData?.ssn,
      state: userData?.state,

      type: "personal",
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Error creating dwolla customer");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

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
        dwollaCustomerId,
        dwollaCustomerUrl,
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

export type CurrentUserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;



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
      id: user?.id!,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
      address1: user?.address1!,
      city: user?.city!,
      dwollaCustomerId: user?.dwollaCustomerId!,
      dwollaCustomerUrl: user?.dwollaCustomerUrl!,
      state: user?.state!,
      postalCode: user?.postalcode!,
      dateOfBirth: user?.dateOfBirth!,
      ssn: user?.ssn!,


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

    return parseStringify({
      linkToken: response.data.link_token,
    });
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
    if (!fundingSourceUrl) throw new Error("Error Creating funding source");

    // Create a bank account using the user Id, itemId, account Id, access Token, funding source URL, and shareable Id
    await createBankAccount({
      userId: user.id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });
    // Revalidate the path reflect the changes
    revalidatePath("/");

    return parseStringify({
      publicTokenExhange: "complete",
    });
  } catch (error) {
    console.log(`An Error occured while creating exchanging token: ${error}`);
    return error;
  }
}


export async function getBanks({ userId }: getBanksProps) {
  try {
    const banks = await prisma.bankAccount.findMany({
      where: {
        userId,
      }
    });

    return banks;

  } catch (error) {
    console.log(error);
    return error;
  }


}
export async function getBank({ bankId }: getBankProps) {
  try {
    const bank = await prisma.bankAccount.findUnique({
      where: {
        id: bankId,
      }
    })

    return bank;

  } catch (error) {
    console.log(error);
    return error;
  }


}
