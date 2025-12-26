import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);

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

        <section>
          <h1>Expense List</h1>
          {expense.length === 0 ? (
            <h3>NO Expense Found</h3>
          ) : (
            expense.map((e) => (
              <ul key={e.id}>
                <li>{e.name}</li>
                <li>{e.date}</li>
                <li>{e.amount}</li>
                <li>{e.category}</li>
                <button onClick={() => deleteExpense(e.id)}>Delete</button>
              </ul>
            ))
          )}
        </section>
        <section>
          <h2>Total Expense section</h2>
          <h4>
          Rs {totalExpense}
       </h4>
        </section>
      </div>
    </>
  );
};

export default App;
