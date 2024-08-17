import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
const BASE_URL = process.env.REACT_APP_BASE_URL;;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const {userData,getUserData,setUserData} = useAuthContext();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    console.log("global");
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Await for the data
        if (data) {
          setUserData(data); // Set the resolved data
        } 
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []); 
  
  

  const addIncome = async (income) => {
    if (!userData || !userData._id) {
      setError("User data not available");
      return;
    }
    try {
      // Log data for debugging
      console.log("Adding income:", { ...income, userId: userData._id });
  
      const response = await axios.post(`${BASE_URL}add-income/${userData._id}`, { ...income, userId: userData._id });
      console.log("Add income response:", response.data);
      await getIncomes(userData._id);
    } catch (error) {
      console.error("Error in adding income", error);
      setError(error.response?.data?.message || "Error in adding income");
    }
  };
  

  const getIncomes = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes/${userId}`);
      setIncomes(response.data);
    } catch (error) {
      console.error("Get Incomes Error:", error);
      setError("Error fetching incomes");
    }
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes(userData._id);
  };

  const calculateTotalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  const addExpense = async (expense) => {
    if (!userData || !userData._id) {
      setError("User data not available");
      return;
    }
    try {
      // Log data for debugging
      console.log("Adding expense:", { ...expense, userId: userData._id });
  
      const response = await axios.post(`${BASE_URL}add-expense/${userData._id}`, { ...expense, userId: userData._id });
      console.log("Add expense response:", response.data);
  
      // Refresh expenses after adding new one
      await getExpenses(userData._id);
    } catch (error) {
      console.error("Error in adding expense", error);
      setError(error.response?.data?.message || "Error in adding expense");
    }
  };
  

  const getExpenses = async (userId) => {
    if(!userId) return;
    try{
      const response = await axios.get(`${BASE_URL}get-expenses/${userId}`);
    setExpenses(response.data);
    } catch (error) {
      console.error("Error in getting expenses:", error);
      setError("Error in fetching expenses");
    }
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses(userData._id);
  };

  const calculateTotalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });
    return totalExpense;
  };

  const calculateTotalBalance = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt); //timestamps
    });
    return history.slice(0,3)
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        deleteIncome,
        calculateTotalIncome,
        incomes,
        addExpense,
        getExpenses,
        deleteExpense,
        calculateTotalExpenses,
        expenses,
        calculateTotalBalance,
        transactionHistory,
        error,
        setError
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
