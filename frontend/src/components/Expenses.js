import React, { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import ExpenseForm from "./ExpenseForm";
import IncomeItems from "./IncomeItems";
import { rupee } from "../utils/Icons";
import { useAuthContext } from "../context/AuthContext";

export default function Expenses() {
  const { getExpenses, deleteExpense, calculateTotalExpenses, expenses } =
    useGlobalContext();
  const {  setUserData, getUserData } = useAuthContext();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log("expense");
    const fetchUserData = async () => {
      const data = await getUserData(); // Await for the data
      await setUserData(data); // Set the resolved data
      // console.log(data);
      getExpenses(data._id);
    };
    fetchUserData();
  }, []);
  

  return (
    <div className="income">
      <div className="innerLayout">
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expenses:{" "}
          <span style={{ color: "red" }}>
            {" "}
            {rupee}
            {calculateTotalExpenses()}
          </span>
        </h2>
        <div className="incomeContent">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              return (
                <IncomeItems
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor={"red"}
                  type={type}
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
