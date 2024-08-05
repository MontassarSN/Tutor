"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Upnav from "@/components/Upnav";
import Details from "./components/Details";
import OwnedCourses from "./components/OwnedCourses";
import Navbar from "./components/Navbar";
import PurchasedCourses from "./components/PurchasedCourses";

export default function Page() {
  const [selectedOption, setSelectedOption] = useState("option1");

  const renderView = () => {
    switch (selectedOption) {
      case "option1":
        return <Details />;
      case "option2":
        return <OwnedCourses />;
      case "option3":
        return <PurchasedCourses />;
      default:
        return <Details />;
    }
  };

  return (
    <div className="flex flex-col">
      <Upnav />
      <div className="ml-10 mt-10">
        <Link href="/">
          <div className="flex flex-row items-center gap-1">
            <div className="relative h-12 w-12">
              <Image
                src="/GraduationCap.jpg"
                alt="Graduation Cap"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className="text-2xl font-bold">E-Tutor</h1>
          </div>
        </Link>
      </div>
      <Navbar onOptionSelect={setSelectedOption}/>
      <div className="view-container mx-auto mt-10">
        {renderView()}
      </div>
    </div>
  );
}
