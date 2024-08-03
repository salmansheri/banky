import { Header } from "@/components/global/header/header";
import { RightSidebar } from "@/components/global/right-sidebar";
import { TotalBalanceBox } from "@/components/global/total-balance-box";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const loggedIn = { firstName: "Salman" };
  return (
    <section className="home">
      <div className="home-content">
        <Header
          title="Welcome"
          type="greeting"
          user={loggedIn.firstName || "Guest"}
          subtext="Access and manage your account and transaction"
        />

        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1245.35}
        />
      </div>
      <RightSidebar user={loggedIn} transaction={[]} banks={[]} />
    </section>
  );
}
