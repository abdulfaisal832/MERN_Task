app.get("/api/statistics", async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(`2022-${Number(month) + 1}-01`);

  try {
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const soldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: true,
    });
    const notSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false,
    });

    res.json({
      totalSales: totalSales[0]?.total || 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    res.status(500).send("Error fetching statistics");
  }
});
