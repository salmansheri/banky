"use server";

import { z } from "zod";
import { SignInFormSchema } from "../validation/sign-in";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { auth, signIn } from "../auth";

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
