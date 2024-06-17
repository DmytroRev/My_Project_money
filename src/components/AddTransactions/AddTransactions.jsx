import { useState } from "react";
import { addTransaction } from "../../redux/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import css from "./AddTransactions.module.css";

export function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null); // Состояние для даты
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

    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    dispatch(
      addTransaction({
        amount,
        date: formattedDate,
        type,
        category,
        subcategory,
        info,
      })
    );
    setAmount("");
    setDate(null);
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
      <div className={css.container}>
        <h1 className={css.title}>Add New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className={css.containerInput}>
            <input
              className={css.input}
              type="number"
              value={amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <DatePicker
              className={css.inpDate}
              selected={date}
              onChange={(date) => setDate(date)}
              placeholderText="Date"
              // className="custom-datepicker"
            />
          </div>
          <div className={css.selectContainer}>
            <select
              className={css.select}
              value={type}
              onChange={handleTypeChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div>
              <select
                className={css.select}
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
          </div>
          <div>
            <input
              type="text"
              value={info}
              placeholder="Info"
              onChange={handleInfoChange}
              disabled={subcategory !== ""}
            />
          </div>
          <div>
            <input
              type="text"
              value={subcategory}
              placeholder="Subcategory"
              onChange={handleSubcategoryChange}
              disabled={info !== ""}
            />
          </div>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
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
