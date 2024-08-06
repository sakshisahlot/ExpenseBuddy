import React, { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import IncomeForm from "./IncomeForm";
import IncomeItems from "./IncomeItems";
import { rupee } from "../utils/Icons";
import { useAuthContext } from "../context/AuthContext";

export default function Income() {
  const { getIncomes, deleteIncome, calculateTotalIncome, incomes,error, setError } = useGlobalContext();
  const {getUserData,userData, setUserData} = useAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
        const data = await getUserData(); // Await for the data
        await setUserData(data); // Set the resolved data
      console.log(data);
        getIncomes(data._id);
    };
    fetchUserData();
  }, []); 

  return (
    <div className="income">
      <div className="innerLayout">
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>{rupee}{calculateTotalIncome()}</span>
        </h2>
        <div className="incomeContent">
          <div className="form-container">
            <IncomeForm />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItems
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor={
                    "var(--color-green)"
                  }
                  type={type}
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
