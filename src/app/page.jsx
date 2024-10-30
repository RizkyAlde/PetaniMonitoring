"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { poppins } from "./fonsts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ubah dari redirect ke useRouter
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [soil, setSoil] = useState(0);
  const [humid, setHumid] = useState(0);
  const [lumen, setLumen] = useState(0);

  const fetchData = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (
      userData &&
      Array.isArray(userData.farmer) &&
      userData.farmer.length > 0
    ) {
      const { id_gh } = userData.farmer[0];

      try {
        const response = await axios.get(`${apiUrl}/monitoring/node${id_gh}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.data);
        setTemp(response.data.temp);
        setSoil(response.data.soil);
        setHumid(response.data.humid);
        setLumen(response.data.lumen);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    } else {
      console.warn("User data or farmer data is missing.");
      // Gunakan useRouter untuk redirect
      router.push("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      router.push("/login"); // Gunakan router.push untuk redirect ke halaman login
    } else {
      fetchData();
    }
  }, [router]);

  return (
    <>
      <MyNavbar activeIndex={0} />
      <div className="main-content">
        <div className={"container mx-auto mt-6"}>
          <p className={`text-[25px] text-center ${poppins.className}`}>
            Monitoring
          </p>
          {/* Kartu untuk menampilkan data suhu */}
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader
                className="block"
                style={{ backgroundColor: "#336600" }}
              >
                <p
                  className={`text-white text-center text-[15px] ${poppins.className}`}
                >
                  SUHU
                </p>
                <p
                  className={`text-white text-center text-[15px] ${poppins.className}`}
                >
                  Celcius (°C)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {temp}°C
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/home-celcius.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{ height: "auto" }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          {/* Kartu untuk menampilkan data kelembaban tanah */}
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader
                className="block"
                style={{ backgroundColor: "#336600" }}
              >
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  KELEMBABAN TANAH
                </p>
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  Kelembapan (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {soil}%
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/icon-tint.png"
                    alt="Thermometer"
                    height={40}
                    width={40}
                    className="my-auto"
                    style={{ height: "auto" }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          {/* Kartu untuk menampilkan data kelembaban udara */}
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader
                className="block"
                style={{ backgroundColor: "#336600" }}
              >
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  KELEMBAPAN UDARA
                </p>
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  Kelembaban (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {humid}%
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/icon-water.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{ height: "auto" }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          {/* Kartu untuk menampilkan data intensitas cahaya */}
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader
                className="block"
                style={{ backgroundColor: "#336600" }}
              >
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  INTENSITAS CAHAYA
                </p>
                <p
                  className={`text-center text-white text-[15px] ${poppins.className}`}
                >
                  Lux (lux)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {lumen} lux
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/menu-navigation.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{ height: "auto" }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
