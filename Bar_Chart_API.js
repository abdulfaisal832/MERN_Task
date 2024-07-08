app.get("/api/bar-chart", async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(`2022-${Number(month) + 1}-01`);

  try {
    const barChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            Infinity,
          ],
          default: "901-above",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.json(barChartData);
  } catch (error) {
    res.status(500).send("Error fetching bar chart data");
  }
});
