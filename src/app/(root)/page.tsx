import { Header } from "@/components/global/header/header";
import { RightSidebar } from "@/components/global/right-sidebar";
import { TotalBalanceBox } from "@/components/global/total-balance-box";
import { getAccount, getAccounts } from "@/lib/actions/bankaccount.actions";
import { getCurrentUser } from "@/lib/actions/user.action";

export default async function Home({
  searchParams: { id, page },
}: SearchParamProps) {
  const currentUser: any = await getCurrentUser();

  const accounts = await getAccounts({
    userId: currentUser.id,
  });

  if (!accounts) return;

  const itemId = (id as string) || accounts?.data[0]?.itemId;

  const account = await getAccount({ itemId });

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
          accounts={accounts?.data}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
        />
      </div>
      <RightSidebar
        user={currentUser}
        transactions={account?.transaction}
        banks={accounts?.data?.slice(0, 2)}
      />
    </section>
  );
}
