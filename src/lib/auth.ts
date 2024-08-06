import NextAuth from "next-auth";
import prisma from "./db";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid user credentials");
        }

        const isValidPassword = bcrypt.compare(
          credentials?.password as string,
          user?.password,
        );

        if (!isValidPassword) {
          throw new Error("Invalid  password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return "/link-account";
    },
  },
  debug: process.env.NODE_ENV === "development",
});
