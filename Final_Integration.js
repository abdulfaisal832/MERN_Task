import React, { useState } from "react";
import TransactionsTable from "./TransactionsTable";
import Statistics from "./Statistics";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const App = () => {
  const [month, setMonth] = useState("3");

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default App;
