import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineLumen = () => {
  const [chartData, setChartData] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

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
            min:minValue,
            max:maxValue,
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: 'black',
                stepSize: 1000
            }
        }
    }
  };

  useEffect(() => {
    const fetchLumen = async () => {
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
        let lumen_predicted = predicted_data.hour_predicted.map(item => item.Predicted_Lumen);
        
        setMinValue(predicted_data.min_lumen);
        setMaxValue(predicted_data.max_lumen);

        const current = await fetch(`${apiUrl}/current_line/node${id_gh}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const current_data = await current.json();
        console.log(current_data);

        let lumen_currently = current_data.hour_currently.map(item => item.Current_Lumen);

        // labels = labels.reverse()
        // lumen = lumen.reverse()

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Intensitas Cahaya Prediksi',
              data: lumen_predicted,
              borderColor: '#FFD700',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: '#FFD700',
              pointBorderWidth: 2,
              pointRadius: 3,
              fill: false,
              tension: 0.1
            },
            {
              label: 'Intensitas Cahaya Aktual',
              data: lumen_currently,
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

    fetchLumen();
  }, []);

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineLumen;
