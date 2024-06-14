import { useSelector } from "react-redux";

export const History = () => {
  const transaction = useSelector((state) => state.transaction.list);

  return (
    <div>
      <h2>Transactions history</h2>
      <ul>
        {transaction.map((item) => (
          <li key={transaction.id}>
            {item.amount} ({item.type}) : {item.info}
          </li>
        ))}
      </ul>
    </div>
  );
};
