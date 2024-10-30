"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { poppins } from "../fonsts";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LineTemp from "./line_temp";
import LineSoil from "./line_soil";
import LineHumid from "./line_humid";
import LineLumen from "./line_lumen";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {

  return (
    <>
      <MyNavbar activeIndex={1} />
      <div className="main-content">
        <div className="container mx-auto mt-6">
          <p className={`text-[25px] text-center ${poppins.className}`}>
            Prediksi Kondisi
          </p>
          <p className={`text-[25px] text-center ${poppins.className}`}>
            1 Jam Kedepan
          </p>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  SUHU
                </p>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  Celcius (°C)
                </p>
              </CardHeader>
            </Card>
            <div className="mt-3" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
              <LineTemp />
            </div>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  KELEMBAPAN TANAH
                </p>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  Kelambapan Relative (RH)
                </p>
              </CardHeader>
            </Card>
            <div className="mt-3" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
              <LineSoil />
            </div>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  KELEMBAPAN UDARA
                </p>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  Kelambapan Relative (RH)
                </p>
              </CardHeader>
            </Card>
            <div className="mt-3" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
              <LineHumid />
            </div>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  INTENSITAS CAHAYA
                </p>
                <p className={`text-white text-center text-[20px] ${poppins.className}`}>
                  Candela (Cd)
                </p>
              </CardHeader>
            </Card>
            <div className="mt-3" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px' }}>
              <LineLumen />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
