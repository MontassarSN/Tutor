"use client";
import React, { useState } from "react";
import Navbar from "./components/formNavbar";
import BasicInfo from "./components/option1/basicInfo";
import AdvancedInfo from "./components/option2/advancedInfo";
import Curriculum from "./components/option3/curriculum";
import PublishCourse from "./components/option4/publishCourse";
import { useOption } from "./context/OptionContext";
import { SectionsProvider } from "./components/option3/context/SectionsContext";
import { LecturesProvider } from "./components/option3/context/LecturesContext";
import { useCourseData } from "@/queries/useCourse";
import useCurrentUser from "@/queries/useCurrentUser";
import { Player } from "@lottiefiles/react-lottie-player";
import { FilesProvider } from "./components/option3/context/FilesContext";

export default function Page({
  searchParams,
}: {
  searchParams: {
    courseId: string | undefined;
  };
}) {
  const { selectedOption } = useOption();
  const [validsCount1, setValidsCount1] = useState(0);
  const [validsCount2, setValidsCount2] = useState(0);
  const [validsCount3, setValidsCount3] = useState(0);
  const [validsCount4, setValidsCount4] = useState(0);

if(searchParams.courseId){  
  const {data:course , isPending: loadingCourse} = useCourseData(searchParams.courseId);
  const { data: user , isPending : loadingUser} = useCurrentUser();
  if(loadingCourse || loadingUser){
    return    <div  className="my-auto ml-[20rem]">
    <Player
      className="m-auto"
      autoplay
      loop
      src="/AnimationLoading.json"
      style={{ height: "20rem", width: "20rem" }}
    />
  </div>
  }
  if (course && course?.user_id !== user?.user_id) {
    return <div        className="my-auto ml-[20rem]"
>
  <Player
        className=""
        autoplay
        loop
        src="/AnimationError.json"
        style={{ height: "20rem", width: "20rem" }}
      />
    </div>;
  }}

  const renderView = () => {
    switch (selectedOption) {
      case "option1":
        return <BasicInfo setValidsCount1={setValidsCount1} />;
      case "option2":
        return (
          <AdvancedInfo
            setValidsCount2={setValidsCount2}
            validsCount2={validsCount2}
          />
        );
      case "option3":
        return (
          <SectionsProvider>
            <LecturesProvider>
              <FilesProvider>
              <Curriculum setValidsCount3={setValidsCount3} />;
              </FilesProvider>
            </LecturesProvider>
          </SectionsProvider>
        );
      case "option4":
        return <PublishCourse setValidsCount4={setValidsCount4} />;
      default:
        return <BasicInfo setValidsCount1={setValidsCount1} />;
    }
  };

  return (
    <div className="flex flex-col ">
      <Navbar
        validsCount1={validsCount1}
        validsCount2={validsCount2}
        validsCount3={validsCount3}
        validsCount4={validsCount4}
      />
      <div className="view-container mx-auto ">{renderView()}</div>
    </div>
  );
}
