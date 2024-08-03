import { DoughnutChart } from "../charts/doughnut-cart";
import { AnimatedCounter } from "../ui/animated-counter";

export const TotalBalanceBox: React.FC<TotalBalanceBoxProps> = ({
  accounts,
  totalBanks,
  totalCurrentBalance,
}) => {
  return (
    <section>
      <div className="total-balance">
        <div className="total-balance-chart gap-5">
          <DoughnutChart accounts={accounts} />
        </div>

        <div className="">
          <h2 className="text-2xl font-bold">Bank Accounts: {totalBanks}</h2>
          <div className="flex flex-col gap-2">
            <p className="total-balance-label">Total Current Balance</p>
            <div className="total-balance-amount ">
              <AnimatedCounter amount={totalCurrentBalance} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
