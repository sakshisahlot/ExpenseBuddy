import React, { useEffect } from "react";
import Chart from "./Chart";
import { useGlobalContext } from "../context/globalContext";
import { rupee } from "../utils/Icons";
import History from "./History";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const {
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateTotalBalance,
    getIncomes,
    getExpenses,
    incomes,
    expenses,
  } = useGlobalContext();

  const {setUserData, getUserData } = useAuthContext();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log("dashboard");
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Await for the data
        await setUserData(data); // Set the resolved data
        if (data && data._id) {
          await getIncomes(data._id);
          await getExpenses(data._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // You may want to set an error state here if needed
      }
    };
    fetchUserData();
  }, []);
  

  const CalculateMinMax = (arr, isMin = true) => {
    if (arr.length === 0) return 0; // Return 0 if the array is empty

    const amounts = arr.map((item) => item.amount);
    const validAmounts = amounts.filter((amount) => amount > 0); // Filter positive amounts

    if (validAmounts.length === 0) return 0; // Return 0 if no positive amounts

    return isMin ? Math.min(...validAmounts) : Math.max(...validAmounts);
  };

  return (
    <div className="dashboard">
      <div className="innerLayout">
        <h1>All Transcations</h1>
        <div className="stats-container">
          <div className="chart-container">
            <Chart />
            <div className="amount-container">
              <div className="income-total">
                <h2>Total Income</h2>
                <p>
                  {rupee} {calculateTotalIncome()}
                </p>
              </div>
              <div className="total-expense">
                <h2>Total Expense</h2>
                <p>
                  {rupee} {calculateTotalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p
                  style={{
                    color:
                      calculateTotalBalance() < 0
                        ? "red"
                        : "var(--color-green)",
                  }}>
                  {rupee} {calculateTotalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-container">
            <History />
            <div className="salary-title">
              <h2>
                Min <span>Salary</span> Max
              </h2>
            </div>
            <div className="salary-item">
              <p>{CalculateMinMax(incomes, true)}</p>
              <p>{CalculateMinMax(incomes, false)}</p>
            </div>
            <div className="salary-title">
              <h2>
                Min <span>Expense</span> Max
              </h2>
            </div>
            <div className="salary-item">
              <p>{CalculateMinMax(expenses, true)}</p>
              <p>{CalculateMinMax(expenses, false)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
