import { useState } from "react";
import { addTransaction } from "../../redux/transactionsSlice";
import { useDispatch } from "react-redux";

export function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("expense");
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction({ amount, date, type, info }));
    setAmount("");
    setDate("");
    setType("expense");
    setInfo("");
  };

  return (
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
  );
}
