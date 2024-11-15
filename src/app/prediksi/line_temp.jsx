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
            min: min_value,
            max: max_value,
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

const LineTemp = () => {
  const [chartData, setChartData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    const fetchTemp = async () => {
      const { farmer } = JSON.parse(localStorage.getItem("user")) ;
      const { id_gh } = farmer[0];

      try {
        const predicted = await fetch(`${apiUrl}/predictions_line/node${id_gh}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const predicted_data = await predicted.json();
        console.log(predicted_data);

        // Process the data here and set it to chartData state
        let labels = predicted_data.hour_predicted.map(item => item.Hour);
        let temperatures_predicted = predicted_data.hour_predicted.map(item => item.Predicted_Temperature);
 
        let min_value = predicted_data.min_temp;
        let max_value = predicted_data.max_temp;

        // labels = labels.reverse()
        // temperatures = temperatures.reverse()

        const current = await fetch(`${apiUrl}/current_line/node${id_gh}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const current_data = await current.json();
        console.log(current_data);

        let temperatures_currently = current_data.hour_currently.map(item => item.Current_Temperature);

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Suhu prediksi',
              data: temperatures_predicted,
              borderColor: '#FF4500',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: '#FF4500',
              pointBorderWidth: 2,
              pointRadius: 3,
              fill: false,
              tension: 0.1
            },
            {
              label: 'Suhu Aktual',
              data: temperatures_currently,
              borderColor: '#000000',
              borderWidth: 1,
              pointBackgroundColor: '#000000',
              pointBorderColor: '#000000',
              pointBorderWidth:2,
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

export default LineTemp;
