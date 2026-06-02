import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ expenses }) {
  const monthlyData = [];

  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString(
      "default",
      { month: "short" }
    );

    const existing = monthlyData.find(
      (item) => item.month === month
    );

    if (existing) {
      existing.amount += expense.amount;
    } else {
      monthlyData.push({
        month,
        amount: expense.amount,
      });
    }
  });

  return (
    <div>
      <h2>Monthly Spending</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;