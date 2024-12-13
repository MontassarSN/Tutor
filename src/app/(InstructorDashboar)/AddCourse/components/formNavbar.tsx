"use client";
import React from "react";
import Image from "next/image";
import { useOption } from '../context/OptionContext';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter

export default function Navbar({
  validsCount1,
  validsCount2,
  validsCount3,
  validsCount4,

}: {
  validsCount1: number;
  validsCount2: number;
  validsCount3: number;
  validsCount4: number;
}) {
  const { selectedOption, setSelectedOption } = useOption();
  const router = useRouter(); // Initialize router
  const searchParams = useSearchParams();


  const handleOptionChange = (option: `option${number}`, validCount: number, requiredCount: number) => {
    if (validCount == requiredCount) {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set('option',option);
      setSelectedOption(option);
      router.push(`/AddCourse?${currentParams.toString()}`);
    }
  };

  return (
    <ul className="flex flex-row gap-5 bg-gray-100 m-auto justify-between px-5 w-[60rem] ">
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center "
        onClick={() => setSelectedOption("option1")}
      >
        <div className="flex items-center gap-2 py-2">
          <Image src="/AddCourse/Stack.png" width={20} height={20} alt="" />
          Basic Information
          {validsCount1 < 9 ? (
            <div className="text-green-600">{validsCount1}/9</div>
          ) : (
            <Image
              src="/AddCourse/Checks.png"
              width={20}
              height={20}
              alt=""
            />
          )}
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option1" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center "
        onClick={() => handleOptionChange("option2", validsCount1, 9)}
      >
        <div className="flex items-center gap-2 py-2">
          <Image src="/AddCourse/ClipboardText.png" width={20} height={20} alt="" />
          Advance Information
          {validsCount2 < 6 ? (
            <div className="text-green-600">{validsCount2}/6</div>
          ) : (
            <Image
              src="/AddCourse/Checks.png"
              width={20}
              height={20}
              alt=""
            />
          )}
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option2" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center "
        onClick={() => handleOptionChange("option3", validsCount2, 6)}
      >
        <div className="flex items-center gap-2 py-2">
          <Image src="/AddCourse/MonitorPlay.png" width={20} height={20} alt="" />
          Curriculum
          
            <Image
              src="/AddCourse/Checks.png"
              width={20}
              height={20}
              alt=""
            />
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option3" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center "
        onClick={() => handleOptionChange("option4", validsCount3, 0)}
      >
        <div className="flex items-center gap-2 py-2">
          <Image src="/AddCourse/PlayCircle.png" width={20} height={20} alt="" />
          Publish Course
          {validsCount2 < 3 ? (
            <div className="text-green-600">{validsCount4}/3</div>
          ) : (
            <Image
              src="/AddCourse/Checks.png"
              width={20}
              height={20}
              alt=""
            />
          )}
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 bottom-0 ${
            selectedOption === "option4" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
    </ul>
  );
}
