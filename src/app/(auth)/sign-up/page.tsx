import { AuthForm } from "@/components/forms/auth-form";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const user = await auth();

  return (
    <section className="flex justify-center items-center max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}
