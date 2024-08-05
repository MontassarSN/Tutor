"use client";
import React from "react";
import Navbar from "./navbar";
import BasicInfo from "./basicInfo";
import AdvancedInfo from "./advancedInfo";
import Curriculum from "./curriculum";
import PublishCourse from "./publishCourse";
import { useOption } from "../context/OptionContext";

export default function Form() {
  const { selectedOption } = useOption();

  const renderView = () => {
    switch (selectedOption) {
      case "option1":
        return <BasicInfo />;
      case "option2":
        return <AdvancedInfo />;
      case "option3":
        return <Curriculum />;
      case "option4":
        return <PublishCourse />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="view-container mx-auto ">{renderView()}</div>
    </div>
  );
}
