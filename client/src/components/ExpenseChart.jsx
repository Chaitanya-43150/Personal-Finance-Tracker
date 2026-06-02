import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function ExpenseChart({ expenses }) {
  const categoryData = [];

  expenses.forEach((expense) => {
    const existing = categoryData.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += expense.amount;
    } else {
      categoryData.push({
        name: expense.category,
        value: expense.amount,
      });
    }
  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
  ];

  return (
    <div>
      <h2>Category Wise Spending</h2>

      <PieChart width={500} height={350}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;