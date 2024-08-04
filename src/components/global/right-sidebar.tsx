import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { BankCard } from "../cards/bank-card";

export const RightSidebar = ({
  user,
  banks,
  transactions,
}: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="bg-gradient-to-r from-[#9400D3] to-[#4B0082] h-32 relative ">
          <div
            className="absolute rounded-full bg-white dark:bg-neutral-900 dark:text-neutral-100  text-primary  size-24 flex items-center justify-center text-6xl
                      top-20 left-5 font-bold"
          >
            {user.firstName[0]}
          </div>
        </div>
        <div className="mt-10 p-5">
          <h1 className="text-2xl">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-sm">sheriffsalman00@gmail.com</p>
        </div>
      </section>
      <section className="p-5">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-xl font-bold">My Banks</h2>
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "flex gap-2 text-sm",
            )}
          >
            <Plus size={20} />
            Add Bank
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5 ">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%] ">
                <BankCard
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};
