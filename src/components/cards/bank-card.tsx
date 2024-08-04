import { formatAmount } from "@/lib/utils";
import Link from "next/link";
import { Currency } from "lucide-react";

export const BankCard = ({
  account,
  userName,
  showBalance,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col ">
      <Link href={"/"} className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-lg font-semibold">
              {account.name || userName}
            </h1>
            <p className="font-ibm-plex-serif font-bold">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-[12px] font-semibold">{userName}</h1>
              <h2>** / **</h2>
            </div>
            <p className="text-[14px] font-semibold tracking-[1.1px] text-white">
              **** **** **** 1234
              <span className="text-[16px]">{account.mask}</span>
            </p>
          </article>
        </div>
        <div className="back-card_content">
          <Currency />
        </div>
      </Link>
      {/* TODO: Copy  */}
    </div>
  );
};
