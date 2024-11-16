"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { poppins } from "@/app/fonsts";

export default function Home() {
  return (
    <>
      <MyNavbar activeIndex={2} />
      <div className="main-content">
        <div className="container mx-auto mt-10">
          <p className={`text-[40px] pb-16 text-center ${poppins.className}`}>
            Bantuan
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* Card */}
            <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-350 shadow-lg">
              <img
                className="w-full h-[auto] object-cover rounded-t-lg pt-6 px-5"
                src="assets/images/img_gb.png" // Path gambar buku tutorial
                alt="Buku Tutorial"
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl text-gray-800 mb-2">Buku Panduan</h2>
                <p className="text-gray-700 text-base">
                  Buku ini memberikan panduan lengkap untuk memahami cara penggunaan aplikasi monitoring.
                </p>
              </div>
              <div className="px-6 pb-6">
                <a
                  href="files/Monitoring_Guide_Book.pdf"
                  download
                  className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
