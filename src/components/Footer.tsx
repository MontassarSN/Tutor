"use client";
import React from "react";
import Image from "next/image";
import FooterDown from "./FooterDown";
import useCurrentUser from "@/queries/useCurrentUser";
import Link from "next/link";
const Footer: React.FC = () => {
  const { data, error } = useCurrentUser();

  return (
    <div className="flex flex-col justify-center m-auto w-full bg-gray-900 text-white">
      {!data && (
        <>
          <div className="flex flex-row w-3/4 m-auto p-10 gap-[20%]">
            <div className="flex flex-col w-2/5 gap-5">
              <h1 className="text-3xl white font-bold">
                Start learning with 67.1k students around the world.
              </h1>
              <div className="flex flex-row gap-3">
                <Link href={"/SignIn"}>
                  <button className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4">
                    Join the Family
                  </button>
                </Link>
                <Link href={"/Courses"}>
                  <button className="bg-gray-700 text-white py-2 px-4">
                    Browse all courses
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-row w-2/5">
              <div className="flex flex-col gap-2 w-1/3">
                <h1 className="text-3xl white font-bold">6.3k</h1>
                <div className="text-xs text-gray-500">Online courses</div>
              </div>
              <div className="flex flex-col gap-2 w-1/3">
                <h1 className="text-3xl white font-bold">26k</h1>
                <div className="text-xs text-gray-500">
                  Certified Instructor
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/3">
                <h1 className="text-3xl white font-bold">99.9%</h1>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="border-t-[1px] border-gray-500"></div>
        </>
      )}

      <FooterDown />
      <div className="border-t-[1px] border-gray-500"></div>
      <div className="px-10 flex flex-row justify-between w-3/4 m-auto py-5 ">
        <div className="text-xs text-gray-500">
          © 2021 - Eduflex. Designed by{" "}
          <span className="text-white">Templatecookie</span>. All rights
          reserved
        </div>
        <select className="bg-gray-900 text-gray-500 outline-none w-36">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    </div>
  );
};

export default Footer;
