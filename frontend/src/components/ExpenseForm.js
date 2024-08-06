import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";
import Button from "./Button";
import { plus } from "../utils/Icons";

export default function ExpenseForm() {
  const {
    addExpense,
    error,
    setError,
  } = useGlobalContext();

  const [inputValues, setInputValues] = useState({
    title: "",
    amount: "",
    date: null, // Use null as initial state for date picker
    category: "",
    description: "",
  });

  const handleInput = (name) => (event) => {
    setInputValues({ ...inputValues, [name]: event.target.value }); // Set the values of the form to the income object
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // To prevent the refresh on submit
    addExpense(inputValues);
    // Clear form after submission
    setInputValues({
      title: "",
      amount: "",
      date: null,
      category: "",
      description: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={inputValues.title}
          name={"title"}
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
        <input
          type="number"
          value={inputValues.amount}
          name={"amount"}
          placeholder="Expense amount"
          onChange={handleInput("amount")}
        />
        <div className="input-control">
          <DatePicker
            id="date"
            placeholderText="Enter a date"
            selected={inputValues.date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setInputValues({ ...inputValues, date: date })}
          />
        </div>
        <div className="selects input-control">
          <select
            required
            value={inputValues.category}
            name="category"
            id="category"
            onChange={handleInput("category")}>
            <option value="" disabled>
              Select Option
            </option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="outing">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-control">
          <textarea
            name="description"
            value={inputValues.description}
            placeholder="Add a description"
            id="description"
            cols="30"
            rows="4"
            onChange={handleInput("description")}></textarea>
        </div>
        <div className="submit-btn">
          <Button
            type="submit"
            name={"Add Expense"}
            icon={plus}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent)"}
            color={"#fff"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}
