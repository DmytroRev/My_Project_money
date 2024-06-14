import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

export const History = () => {
  const transactions = useSelector((state) => state.transactions.list);

  return (
    <div>
      <h1>Transaction History</h1>
      <div>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={nanoid()}>
              <p>
                {transaction.amount} ({transaction.category}):{" "}
                {transaction.info}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
