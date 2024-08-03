"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [125, 2500, 3750],
        backgroundColor: ["#1e1b4b", "#4c1d95", "#6d28d9"],
      },
    ],
    labels: ["Bank of America", "Chase Bank", "Citibank"],
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};
