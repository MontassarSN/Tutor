"use client";
import React, { useState } from "react";
import Navbar from "./formNavbar";
import BasicInfo from "./option1/basicInfo";
import AdvancedInfo from "./option2/advancedInfo";
import Curriculum from "./option3/curriculum";
import PublishCourse from "./option4/publishCourse";
import { useOption } from "../context/OptionContext";
import { SectionsProvider } from "./option3/context/SectionsContext";
import { LecturesProvider } from "./option3/context/LecturesContext";

export default function Form() {
  const { selectedOption } = useOption();
  const [validsCount1, setValidsCount1] = useState(2);
  const [validsCount2, setValidsCount2] = useState(0);
  const [validsCount3, setValidsCount3] = useState(0);
  const [validsCount4, setValidsCount4] = useState(0);
  switch (selectedOption) {
    case "option2":
      setValidsCount1(9);
      break;
    case "option3":
      setValidsCount1(9);
      setValidsCount2(6);
      break;
    case "option4":
      setValidsCount1(9);
      setValidsCount2(6);
      setValidsCount3(10);
      break;
    default:
      break;
  }
  const renderView = () => {
    switch (selectedOption) {
      case "option1":
        return <BasicInfo  setValidsCount1={setValidsCount1} />;
      case "option2":
        return <AdvancedInfo setValidsCount2={setValidsCount2} validsCount2={validsCount2} />;
      case "option3":
        return (
          <SectionsProvider>
            <LecturesProvider>
              <Curriculum  setValidsCount3={setValidsCount3} />;
            </LecturesProvider>
          </SectionsProvider>
        );
      case "option4":
        return   <PublishCourse setValidsCount4={setValidsCount4} />;

      default:
        return <BasicInfo  setValidsCount1={setValidsCount1} />;
    }
  };

  return (
    <div className="flex flex-col">
        <Navbar validsCount1={validsCount1} validsCount2={validsCount2} validsCount3={validsCount3} validsCount4={validsCount4} />
      <div className="view-container mx-auto ">{renderView()}</div>
    </div>
  );
}
