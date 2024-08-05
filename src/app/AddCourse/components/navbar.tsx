import React from "react";
import Image from "next/image";
import { useOption } from '../context/OptionContext';

const Navbar: React.FC = () => {
  const { selectedOption, setSelectedOption } = useOption();

  return (
    <ul className="flex flex-row gap-5 bg-gray-100 m-auto justify-between px-5 w-[60rem] py-3">
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center"
        onClick={() => setSelectedOption("option1")}
      >
        <div className="flex items-center gap-2">
          <Image src="/AddCourse/Stack.png" width={20} height={20} alt="" />
          Basic Information
          <Image
            src="/AddCourse/Checks.png"
            className="hidden"
            width={20}
            height={20}
            alt=""
          />
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option1" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
      {/* Repeat similar structure for other options */}
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center"
        onClick={() => setSelectedOption("option2")}
      >
        <div className="flex items-center gap-2">
          <Image src="/AddCourse/ClipboardText.png" width={20} height={20} alt="" />
          Advance Information
          <Image
            src="/AddCourse/Checks.png"
            className="hidden"
            width={20}
            height={20}
            alt=""
          />
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option2" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
      <li
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center"
        onClick={() => setSelectedOption("option3")}
      >
        <div className="flex items-center gap-2">
          <Image src="/AddCourse/MonitorPlay.png" width={20} height={20} alt="" />
          Curriculum
          <Image
            src="/AddCourse/Checks.png"
            className="hidden"
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
        className="cursor-pointer text-sm flex flex-col font-semibold gap-1 justify-center"
        onClick={() => setSelectedOption("option4")}
      >
        <div className="flex items-center gap-2">
          <Image src="/AddCourse/PlayCircle.png" width={20} height={20} alt="" />
          Publish Course
          <Image
            src="/AddCourse/Checks.png"
            className="hidden"
            width={20}
            height={20}
            alt=""
          />
        </div>
        <div
          className={`bg-orange-500 h-0.5 transition-all duration-300 ${
            selectedOption === "option4" ? "w-full" : "w-0"
          }`}
        ></div>
      </li>
    </ul>
  );
};

export default Navbar;
