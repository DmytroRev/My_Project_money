import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const PieCharts = () => {
  const transactions = useSelector((state) => state.transactions.list);

  const categories = [
    "food",
    "important",
    "wishlist",
    "exchange",
    "salary",
    "other",
  ];

  const data = categories.map((category) => {
    const total = transactions
      .filter((transaction) => transaction.category === category)
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    return { name: category, value: total };
  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28ED6",
    "#FF4567",
  ];

  const renderCustomLabel = ({ percent, x, y, midAngle }) => {
    const radius = 25 + 30 * percent;
    const xPos = x + radius * Math.cos((-midAngle * Math.PI) / 180);
    const yPos = y + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={xPos}
        y={yPos}
        fill="white"
        textAnchor={xPos > x ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomLegend = ({ payload }) => {
    return (
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.payload.name}: {entry.payload.value.toFixed(2)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Transactions Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index} sfdas`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
