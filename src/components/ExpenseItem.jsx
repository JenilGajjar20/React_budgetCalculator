import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { addCommas } from '../utils/thousandSeparator'

const ExpenseItem = ({ expense, deleteItem, editItem }) => {
  const { id, expenseName, expenseAmount } = expense;
  return (
    <>
      <li className="list__item">
        <div className="item__info">
          <span className="item__name">{expenseName}</span>
          <span className="item__amount">
            <FaRupeeSign className="rupee__icon" /> {addCommas(expenseAmount)}
          </span>
        </div>
        <div>
          <button className="edit__btn" onClick={() => editItem(id)}>
            <MdEdit />
          </button>
          <button className="delete__btn" onClick={() => deleteItem(id)}>
            <MdDelete />
          </button>
        </div>
      </li>
    </>
  );
};

export default ExpenseItem;
