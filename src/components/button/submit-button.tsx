import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  type: "sign-in" | "sign-up";
  user: string | null;
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
