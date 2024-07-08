import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState("3"); // Default to March

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(
        `/api/transactions?month=${month}&search=${search}&page=${page}`
      );
      setTransactions(response.data);
    };
    fetchTransactions();
  }, [search, page, month]);

  return (
    <div>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions"
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
