import React, { useEffect } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

const ExpenseItem = ({ expense, deleteItem, editItem }) => {
  const { id, expenseName, expenseAmount } = expense;
  const [color, setColor] = React.useState("");
  useEffect(() => {
    if (expenseAmount > 10000) {
      setColor("red");
    } else {
      setColor("#00FF00");
    }
  }, [expenseAmount]);
  return (
    <>
      <li
        className="list__item"
        style={{
          borderLeft: `10px solid ${color}`,
        }}
      >
        <div className="item__info">
          <span className="item__name">{expenseName}</span>
          <span className="item__amount">
            <FaRupeeSign className="rupee__icon" /> {expenseAmount}
          </span>
        </div>
        <div>
          <button className="edit__btn" onClick={() => editItem(id)}>
            <AiTwotoneEdit/>
          </button>
          <button className="delete__btn" onClick={() => deleteItem(id)}>
            <AiFillDelete />
          </button>
        </div>
      </li>
    </>
  );
};

export default ExpenseItem;
