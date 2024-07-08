import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const PieChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/pie-chart?month=${month}`);
      setData(response.data);
    };
    fetchData();
  }, [month]);

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: data.map((_, index) => `hsl(${index * 30}, 70%, 50%)`),
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
