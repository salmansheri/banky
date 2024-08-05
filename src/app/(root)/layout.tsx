import { MobileNavigation } from "@/components/global/mobile-navigation";
import { Sidebar } from "@/components/global/sidebar";
import { getCurrentUser } from "@/lib/actions/user.action";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex flex-col md:flex-row h-screen w-full font-inter">
      <Sidebar user={currentUser as User} />
      <MobileNavigation user={currentUser as User} />

      {children}
    </main>
  );
}
