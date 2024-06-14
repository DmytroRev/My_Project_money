import { useState } from "react";
import { addTransaction } from "../../redux/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";

export function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(""); // Состояние для даты
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food"); // Дефолтная категория для расходов
  const [info, setInfo] = useState("");
  const [subcategory, setSubcategory] = useState(""); // Подкатегория для ввода
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
    if (e.target.value !== "") {
      setSubcategory("");
    }
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    if (e.target.value !== "") {
      setInfo("");
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    if (newType === "expense") {
      setCategory("food");
    } else {
      setCategory("exchange");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTransaction({ amount, date, type, category, subcategory, info })
    );
    setAmount("");
    setDate("");
    setType("expense");
    setCategory("food");
    setInfo("");
    setSubcategory("");
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const transactionDate = transaction.date;
    if (!acc[transactionDate]) acc[transactionDate] = [];
    acc[transactionDate].push(transaction);
    return acc;
  }, {});

  return (
    <div>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={handleTypeChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "expense" ? (
              <>
                <option value="food">Food</option>
                <option value="important">Important</option>
                <option value="wishlist">Wishlist</option>
                <option value="other">Other</option>
              </>
            ) : (
              <>
                <option value="exchange">Exchange</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label>Info:</label>
          <input
            type="text"
            value={info}
            onChange={handleInfoChange}
            disabled={subcategory !== ""}
          />
        </div>
        <div>
          <label>Subcategory:</label>
          <input
            type="text"
            value={subcategory}
            onChange={handleSubcategoryChange}
            disabled={info !== ""}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      <div>
        <h2>Recent Transactions</h2>
        {Object.keys(groupedTransactions).map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {groupedTransactions[date].map((transaction, index) => (
                <li key={index}>
                  {transaction.amount} ({transaction.category}):{" "}
                  {transaction.info}
                  {transaction.subcategory && ` || ${transaction.subcategory}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
