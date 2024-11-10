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
            max: 100,
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
        const response1 = await fetch(`${apiUrl}/predictions_line/node${id_gh}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const predicted_data = await response1.json();
        console.log(predicted_data);

        // Process the data here and set it to chartData state
        let labels = predicted_data.hour_predicted.map(item => item.Hour);
        let humidity = predicted_data.hour_predicted.map(item => item.Predicted_Humidity);
 
        // labels = labels.reverse()
        // moist = moist.reverse()\
        
        const response2 = await fetch(`${apiUrl}/current_line/node${id_gh}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const current_data = await response2.json();
        console.log(current_data);

        let humidity_currently = current_data.hour_currently.map(item => item.Current_Humidity);

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Kelembaban Udara Prediksi',
              data: humidity,
              borderColor: '#56A3A6',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: '#56A3A6',
              pointBorderWidth: 2,
              pointRadius: 3,
              fill: false,
              tension: 0.1
            },
            {
              label: 'Kelembaban Udara Aktual',
              data: humidity_currently,
              borderColor: '#000000',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: '#000000',
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
