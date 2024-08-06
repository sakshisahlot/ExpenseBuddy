import React from "react";
import {
  calender,
  comment,
  rupee,
  trash,
  card,
  freelance,
  money,
  piggy,
  stocks,
  users,
  book,
  food,
  medical,
  tv,
  takeaway,
  clothing,
  circle,
} from "../utils/Icons";
import Button from "./Button";
import { dateFormat } from "../utils/DateFormat";

export default function IncomeItems(props) {
  const incomeCategoryIcon = () => {
    switch (props.category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bank-transfer":
        return card;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCategoryIcon = () => {
    switch (props.category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "outing":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };
  return (
    <div
      className="incomeItems"
      style={{ "--indicator-color": props.indicatorColor }}>
      <div className="icon">
        {props.type === "expense"
          ? expenseCategoryIcon()
          : incomeCategoryIcon()}
      </div>
      <div className="income-content">
        <h5>{props.title}</h5>
        <div className="inner-income-content">
          <div className="text">
            <p>
              {rupee} {props.amount}
            </p>
            <p>
              {calender} {dateFormat(props.date)}
            </p>
            <p>
              {comment} {props.description}
            </p>
            <div className="btn-container">
              <Button
                icon={trash}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => {
                  props.deleteItem(props.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
