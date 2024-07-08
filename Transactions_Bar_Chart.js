import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/bar-chart?month=${month}`);
      setData(response.data);
    };
    fetchData();
  }, [month]);

  const chartData = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
    datasets: [{
      label: 'Number of Items',
      data: data.map(d => d.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  return <Bar data={chartData} />;
};

export default BarChart;
