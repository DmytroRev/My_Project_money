import { useState } from "react";
import { addTransaction } from "../../redux/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";

export function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(""); // Состояние для даты
  const [type, setType] = useState("expense");
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);
  //   console.log("Transactions:", transactions);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction({ amount, date, type, info }));
    setAmount("");
    setDate(""); // Очищаем состояние даты после добавления транзакции
    setType("expense");
    setInfo("");
  };

  // Группировка транзакций по дате
  const groupedTransactions = transactions
    ? transactions.reduce((acc, transaction) => {
        const transactionDate = transaction.date;
        if (!acc[transactionDate]) acc[transactionDate] = [];
        acc[transactionDate].push(transaction);
        return acc;
      }, {})
    : {};
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
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label>Info:</label>
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
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
                  {transaction.amount} ({transaction.type}): {transaction.info}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
