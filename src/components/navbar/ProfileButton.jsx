import { poppins } from "@/app/fonsts";
import { UserContext } from "@/app/providers";
import Image from "next/image";
import React, { useContext } from "react";

const ProfileButton = () => {
  const { farmer } = JSON.parse(localStorage.getItem("user"));
  const { id_gh } = farmer[0]
  const { username } = farmer[0]

  return (
    <div
      className={
        "flex items-start gap-[10px] justify-center text-gray-200 pb-2 pt-4 mx-[1px] " +
        poppins.className
      }
    >
      <div className="w-[40px] h-[40px] relative">
        <Image
          className=" rounded-full"
          loading="lazy"
          alt="profile picture"
          src="/assets/images/coba.jpeg"
          fill={true}
          sizes="40px"
        />
      </div>
      <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
        <div className="flex flex-col items-start justify-start">
          <div className="relative leading-[140%] text-[12px] inline-block min-w-[77px]">
            {username}
          </div>
          <div className="flex flex-row items-start justify-start py-0 px-px text-[10px] text-gray-300">
            <div className="relative leading-[140%] inline-block ">
              Greenhouse {id_gh}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
