import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, clearItems, deleteItem, editItem }) => {
  const itemCount = `(${expenses.length} item${expenses.length > 1 ? "s" : ""})`
  return (
    <>
      <ul className="list">
        <h3>Item List {expenses.length > 0 ? itemCount : ""}</h3>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          );
        })}
        {expenses.length > 0 ? (
          <button className="clear__btn" onClick={clearItems}>
            Clear Expenses
            <MdDelete className="btn__icon" />
          </button>
        ) : (
          <p className="empty__list">List is empty!</p>
        )}
      </ul>
    </>
  );
};

export default ExpenseList;
