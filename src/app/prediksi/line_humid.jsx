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
            min:20,
            max: 85,
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

const LineHumid = () => {
  const [chartData, setChartData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    const fetchMoist = async () => {
      const { farmer } = JSON.parse(localStorage.getItem("user")) ;
      const { id_gh } = farmer[0];

      try {
        const response = await fetch(`${apiUrl}/line/node${id_gh}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);

        // Process the data here and set it to chartData state
        let labels = data.data_sensor.map(item => item.time);
        let moist = data.data_sensor.map(item => item.humid);
 
        labels = labels.reverse()
        moist = moist.reverse()
        const chartData = {
          labels,
          datasets: [
            {
              label: 'Humidity',
              data: moist,
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

    fetchMoist();
  }, []);

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineHumid;
