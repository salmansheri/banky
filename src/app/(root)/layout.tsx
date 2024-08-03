import { MobileNavigation } from "@/components/global/mobile-navigation";
import { Sidebar } from "@/components/global/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedInUser = {
    firstName: "Salman",
    lastname: "Sheiff",
  };
  return (
    <main className="flex flex-col md:flex-row h-screen w-full font-inter">
      <Sidebar user={loggedInUser} />
      <MobileNavigation />

      {children}
    </main>
  );
}
