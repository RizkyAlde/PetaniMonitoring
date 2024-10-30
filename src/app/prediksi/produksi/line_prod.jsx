import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false

      }
    },
    scales: {
        x: {
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: 'black'
            }
        },
        y: {
            beginAtZero: true,
            min:0,
            max: 40,
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: 'black',
                stepSize: 1
            }
        }
    }
};

const LineProd = () => {
  const [chartData, setChartData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/node1`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);

        // Process the data here and set it to chartData state
        const labels = data.time_temp.map(item => item.time);
        const temperatures = data.time_temp.map(item => item.temp);
 
        const chartData = {
          labels,
          datasets: [
            {
              label: 'Produksi',
              data: temperatures,
              borderColor: 'green',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: 'green',
              pointBorderWidth: 2,
              pointRadius: 3,
              fill: false,
              tension: 0.1
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTemp();
  }, []);

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineProd;
