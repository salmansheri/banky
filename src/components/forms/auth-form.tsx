"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { SignInFormSchema } from "@/lib/validation/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignUpFormSchema } from "@/lib/validation/sign-up";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CustomInput, FormFieldType } from "../global/custom-input";
import { SubmitButton } from "../button/submit-button";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // const formSchema = type === "sign-in" ? SignInFormSchema : SignUpFormSchema;

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {};

  const isLoading = form.formState.isSubmitting;
  // const isLoading = true;

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        {/* <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/logo-removebg.png"
            alt="logo"
            width={100}
            height={100}
            className=""
          />
        </Link> */}

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold ">
            {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
          </h1>
          <p className="text-[16px] font-normal ">
            {user
              ? "Link your account to get started"
              : "Please Enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {type === "sign-up" && (
                <>
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter Your First Name"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter Your Address"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Enter Your State Name"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Ex: 234343 323434 "
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="Enter Your Birth Date"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="Enter Your SSN"
                    fieldType={FormFieldType.INPUT}
                  />
                </>
              )}
              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your Email"
                fieldType={FormFieldType.INPUT}
              />
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your Password"
                fieldType={FormFieldType.PASSWORD}
              />

              <SubmitButton isLoading={isLoading} type={type} user={user} />
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p>
              {type === "sign-in"
                ? "Dont't have an account?"
                : "Already have an account"}
            </p>
            {type === "sign-in" ? (
              <Link
                href="/sign-up"
                className="text-primary hover:underline transition"
              >
                Sign-up
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="text-primary hover:underline transition"
              >
                Sign-in
              </Link>
            )}
          </footer>
        </>
      )}
    </section>
  );
};
