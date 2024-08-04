import * as z from "zod";

export const SignUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
  ssn: z.string(),
  dateOfBirth: z.string(),
});
