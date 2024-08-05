import * as z from "zod";

export const SignInFormSchema = (type: string) => z.object({
  firstName: type === "sign-in" ? z.string().optional() : z.string(),
  lastName: type === "sign-in" ? z.string().optional() : z.string(),
  address: type === "sign-in" ? z.string().optional() : z.string(),
  state: type === "sign-in" ? z.string().optional() : z.string(),
  city: type === "sign-in" ? z.string().optional() : z.string(),
  postalCode: type === "sign-in" ? z.string().optional() : z.string(),
  dateOfBirth: type === "sign-in" ? z.string().optional() : z.string(),
  ssn: type === "sign-in" ? z.string().optional() : z.string(),
  email: type === "sign-in" ? z.string().optional() : z.string().email(),
  password: type === "sign-in" ? z.string().optional() : z.string().min(3),
});


