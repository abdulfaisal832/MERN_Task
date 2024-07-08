app.get("/api/transactions", async (req, res) => {
  const { search = "", page = 1, perPage = 10 } = req.query;
  const query = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).send("Error fetching transactions");
  }
});
