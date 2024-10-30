"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { poppins } from "@/app/fonsts";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LineProd from "./line_prod";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: [
        '06:00', '06:05', '06:10', '06:15', '06:20', 
        '06:25', '06:30', '06:35', '06:40', '06:45', 
        '06:50', '06:55', '07:00'
    ],
    datasets: [
        {
            label: 'Suhu',
            data: [34, 32, 35, 36, 37, 38, 36, 35, 36, 37, 36, 35, 36],
            borderColor: 'green',
            borderWidth: 1,
            pointBackgroundColor: 'white',
            pointBorderColor: 'green',
            pointBorderWidth: 3,
            pointRadius: 5,
            fill: false,
            tension: 0.1
        }
    ]
};

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
            min:30,
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

export default function Home() {
  return (
    <>
      <MyNavbar activeIndex={0} />
      <div className="main-content">
        <div className="container mx-auto mt-10">
          <p className={`text-[40px] text-center ${poppins.className}`}>
            Prediksi Produksi
          </p>
          <div className="container mx-auto justify-center mt-5">
            <div className="mt-3" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
              <LineProd />
            </div>
          </div>  
        </div>
      </div>
    </>
  );
}
