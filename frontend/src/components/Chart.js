import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, // Import LinearScale here
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../context/globalContext";
import { dateFormat } from "../utils/DateFormat";

ChartJS.register(
  CategoryScale,
  LinearScale, // Register LinearScale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((income) => {
      const { date } = income;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expense",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="chart">
      <Line data={data} />
    </div>
  );
}
