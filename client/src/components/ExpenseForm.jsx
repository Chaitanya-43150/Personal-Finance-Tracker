import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({
  fetchExpenses,
  editingExpense,
  setEditingExpense,
}) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setExpense({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date
          ? editingExpense.date.split("T")[0]
          : "",
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        await API.put(
          `/expenses/${editingExpense._id}`,
          expense
        );

        setEditingExpense(null);
      } else {
        await API.post("/expenses", expense);
      }

      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
      });

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingExpense(null);

    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {editingExpense
          ? "Edit Expense"
          : "Add Expense"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-5 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={expense.title}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition"
          >
            {editingExpense
              ? "Save Changes"
              : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white rounded-lg px-4 py-3 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;