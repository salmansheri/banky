import { AuthForm } from "@/components/forms/auth-form";
import { CurrentUserType, getCurrentUser } from "@/lib/actions/user.action";

export const LinkAccountPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm type="sign-up" user={currentUser as CurrentUserType} />
    </div>
  );
};

export default LinkAccountPage;
