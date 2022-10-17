import ExpenseForm from "./components/ExpenseForm";
import Alerts from "./components/Alerts";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { addCommas, removeNonNumeric } from "./utils/thousandSeparator";

// Icons
import { FaRupeeSign } from "react-icons/fa";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // ----- State Values -----
  // All expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single Expense Name
  const [expenseName, setExpenseName] = useState("");
  // Single Expense Amount
  const [expenseAmount, setExpenseAmount] = useState("");
  // Alerts
  const [alert, setAlert] = useState({ show: false });
  // Edit
  const [edit, setEdit] = useState(false);
  // Edit id
  const [id, setId] = useState(0);
  // ----- functionality -----

  // ----- useEffect -----
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle Expense Name
  const handleExpenseName = (event) => {
    setExpenseName(event.target.value);
  };

  // Handle Expense Amount
  const handleExpenseAmount = (event) => {
    setExpenseAmount(addCommas(removeNonNumeric(event.target.value)));
  };

  // Handle Alerts
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  // Handle Submit Button
  const handleSubmit = (event) => {
    event.preventDefault();
    if (expenseName !== "" && removeNonNumeric(expenseAmount) > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? {
                ...item,
                expenseName,
                expenseAmount: removeNonNumeric(expenseAmount),
              }
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({
          type: "success",
          text: "Item Updated successfully.",
        });
      } else {
        const singleExpense = {
          id: uuidv4(),
          expenseName,
          expenseAmount: removeNonNumeric(expenseAmount),
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({
          type: "success",
          text: "Item added successfully",
        });
      }
      setExpenseName("");
      setExpenseAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `Name should not be empty and amount should be greater than zero.`,
      });
    }
  };

  // Clear all the items int list
  const clearItems = () => {
    setExpenses([]);
    handleAlert({
      type: "success",
      text: "All items are deleted successfully.",
    });
  };

  // Delete single item
  const deleteItem = (id) => {
    let tempExpense = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpense);
    handleAlert({
      type: "success",
      text: "Item has been deleted successfully.",
    });
  };

  // Edit Item
  const editItem = (id) => {
    let expense = expenses.find((item) => item.id === id);
    const { expenseName, expenseAmount } = expense;
    setExpenseName(expenseName);
    setExpenseAmount(expenseAmount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alerts type={alert.type} text={alert.text} />}
      <h1 className="budget__calc">Budget Calculator</h1>
      <h4>
        Total Spending:{" "}
        <span className="total">
          <FaRupeeSign className="rupee__icon" />
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.expenseAmount));
          }, 0)}
        </span>
      </h4>
      <main className="App">
        <ExpenseForm
          expenseName={expenseName}
          expenseAmount={expenseAmount}
          handleExpenseName={handleExpenseName}
          handleExpenseAmount={handleExpenseAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </main>
    </>
  );
}

export default App;
