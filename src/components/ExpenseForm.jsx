import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  expenseName,
  expenseAmount,
  handleExpenseName,
  handleExpenseAmount,
  handleSubmit,
  edit,
}) => {
  const customStyle = {
    fontSize: "20px",
    marginBottom: "6px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <label htmlFor="name" style={customStyle}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="expenseName"
            name="expenseName"
            placeholder="e.g. Rent"
            value={expenseName}
            onChange={handleExpenseName}
          />
        </div>
        <div className="col">
          <label htmlFor="amount" style={customStyle}>
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="expenseAmount"
            name="expenseAmount"
            placeholder="e.g. 100"
            value={expenseAmount}
            onChange={handleExpenseAmount}
          />
        </div>
      </div>
      <button type="submit" className="submit__btn">
        {edit ? "Edit" : "Submit"}
        <MdSend className="btn__icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
