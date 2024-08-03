"use client";

import CountUp from "react-countup";

interface AnimatedCounterProps {
  amount: number;
}
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ amount }) => {
  return (
    <>
      <CountUp
        end={amount}
        prefix="INR "
        duration={2.75}
        decimal=","
        className="text-xl"
      />
    </>
  );
};
