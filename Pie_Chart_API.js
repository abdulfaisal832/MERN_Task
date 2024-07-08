app.get("/api/pie-chart", async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(`2022-${Number(month) + 1}-01`);

  try {
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(pieChartData);
  } catch (error) {
    res.status(500).send("Error fetching pie chart data");
  }
});
