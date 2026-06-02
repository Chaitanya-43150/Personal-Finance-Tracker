import { useEffect, useState } from "react";

import API from "../services/api";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Personal Finance Tracker
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Total Expenses
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-2">
          ₹ {totalExpenses}
        </p>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <MonthlyChart expenses={expenses} />
        </div>
      </div>

      {/* Expense Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <ExpenseForm
          fetchExpenses={fetchExpenses}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />
      </div>

      {/* Expense List */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          setEditingExpense={setEditingExpense}
        />
      </div>
    </div>
  );
}

export default Dashboard;