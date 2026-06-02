import API from "../services/api";

function ExpenseList({
  expenses,
  fetchExpenses,
  setEditingExpense,
}) {
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Your Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses found.
        </p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {expense.title}
                </h3>

                <p className="text-green-600 font-medium">
                  ₹ {expense.amount}
                </p>

                <p className="text-gray-500">
                  {expense.category}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setEditingExpense(expense)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteExpense(expense._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;