import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { SignInFormSchema } from "@/lib/validation/sign-in";
import { z } from "zod";
const formSchema = SignInFormSchema("sign-up");

interface SubmitButtonProps {
  type: "sign-in" | "sign-up";
  user: z.infer<typeof formSchema> | undefined;
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  type,
  user,
  isLoading,
}) => {
  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          Loading...
        </>
      ) : (
        <>
          {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
        </>
      )}
    </Button>
  );
};
