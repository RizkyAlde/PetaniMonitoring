"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { poppins } from "@/app/fonsts";

export default function Home() {
    return (
      <>
        <MyNavbar activeIndex={2} />
        <div className="main-content">
          <div className="container mx-auto mt-10">
            <p className={`text-[40px] text-center ${poppins.className}`}>
              Bantuan
            </p>
            <div className="container mx-auto justify-center mt-5">
            </div>  
          </div>
        </div>
      </>
    );
  }

