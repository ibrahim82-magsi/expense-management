import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  const clearAllExpenses = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all expenses"
    );
    if (confirmClear) {
      setExpense([]);
      localStorage.removeItem("expenses");
    }
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!name || !amount || !date || !category) {
      alert("all fields are required");
      return;
    }
    if (amount <= 0) {
      alert("the amount must be greater then zero");
      return;
    }
    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      date,
      category,
    };
    setExpense([...expense, newExpense]);

    console.log([...expense, newExpense]);

    setName("");
    setAmount("");
    setDate("");
    setCategory("");
  };
  const deleteExpense = (id) => {
    setExpense((prevExpense) => prevExpense.filter((e) => e.id !== id));
  };
  const totalExpense = expense.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = expense.filter((e) => {
    const matchDate = filterDate === "" || e.date === filterDate;
    const matchCategory =
      filterCategory === "" || e.category === filterCategory;
    return matchDate && matchCategory;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortType === "amount") {
      return a.amount - b.amount;
    }
    if (sortType === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });
  return (
    <>
      <div>
        <div>
          <h1>Expense Management System</h1>
        </div>
        <section>
          <h2>Expense Input</h2>
          <form>
            <input
              type="text"
              value={name}
              placeholder="Enter Expense Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              value={amount}
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              value={date}
              placeholder="Enter date"
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              value={category}
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={addExpense}>Add Expense</button>
          </form>
        </section>
        <div>
          <h2>Filter data with date Or category</h2>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>

        <div className="sorted-div">
          <h2>Sort by Date And Amount</h2>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </div>

        <section>
          <h1>Expense List</h1>
          {expense.length === 0 ? (
            <h3>NO Expense Found</h3>
          ) : (
            sortedExpenses.map((e) => (
              <ul key={e.id}>
                <li>{e.name}</li>
                <li>{e.date}</li>
                <li>{e.amount}</li>
                <li>{e.category}</li>
                <button onClick={() => deleteExpense(e.id)}>Delete</button>
              </ul>
            ))
          )}
          <span>
            <button onClick={clearAllExpenses}>Clear all expenses</button>
          </span>
        </section>
        <section>
          <h2>Total Expense section</h2>

          <h4>Rs {totalExpense}</h4>
        </section>
      </div>
    </>
  );
};

export default App;
