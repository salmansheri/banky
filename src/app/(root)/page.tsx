import { Header } from "@/components/global/header/header";
import { RightSidebar } from "@/components/global/right-sidebar";
import { TotalBalanceBox } from "@/components/global/total-balance-box";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/user.action";
import Image from "next/image";

export default async function Home() {
  const currentUser: any = await getCurrentUser();
  return (
    <section className="home">
      <div className="home-content">
        <Header
          title="Welcome"
          type="greeting"
          user={currentUser.firstName || "Guest"}
          subtext="Access and manage your account and transaction"
        />

        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1245.35}
        />
      </div>
      <RightSidebar user={currentUser} transaction={[]} banks={[{}, {}]} />
    </section>
  );
}
