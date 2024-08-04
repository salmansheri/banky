import * as z from "zod";

export const SignInFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  state: z.string(),
  postalCode: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
});
