import { AuthForm } from "@/components/forms/auth-form";

export default function SignInPage() {
  return (
    <section className="flex justify-center items-center max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
}
