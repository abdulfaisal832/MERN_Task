const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

mongoose.connect("mongodb://localhost:27017/transactions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  sold: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.get("/api/init", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    res.send("Database initialized with seed data");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
