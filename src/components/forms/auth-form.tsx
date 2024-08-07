"use client";

import { createUser, CurrentUserType } from "@/lib/actions/user.action";
import { SignInFormSchema } from "@/lib/validation/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SubmitButton } from "../button/submit-button";
import { CustomInput, FormFieldType } from "../global/custom-input";
import { PlaidLink } from "../global/plaid-link";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
  user?: CurrentUserType;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, user }) => {
  // const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const formSchema = SignInFormSchema(type);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  const { mutate, data } = useMutation({
    mutationFn: async (userData: z.infer<typeof formSchema>) => {
      const newUser = await createUser(userData);

      return newUser;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Successfully created new account.",
      });

      router.push("/sign-in");
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Something Went Wrong",
        description: "Please try again Later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      state: values.state,
      city: values.state,
      postalCode: values.postalCode,
      dateOfBirth: values.dateOfBirth,
      ssn: values.ssn,
      email: values.email,
      password: values.password,
    };

    if (type === "sign-up") {
      mutate(userData);
    }

    if (type === "sign-in") {
      try {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isLoading = form.formState.isSubmitting;
  // const isLoading = true;

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
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
        <div className="flex flex-col gap-4">
          {/* Plaid Link */}
          {/* @ts-ignore  */}
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4 justify-between">
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
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter Your Address"
                    fieldType={FormFieldType.INPUT}
                  />

                  <div className="flex gap-4 justify-between">
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
                  </div>

                  <div className="flex gap-4 justify-between">
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
                  </div>
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
