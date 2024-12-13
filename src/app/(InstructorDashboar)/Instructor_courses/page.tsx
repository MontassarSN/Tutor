"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "@/queries/useCurrentUser";
import Card from "@/components/Card";
import { FetchInstructorCourses } from "@/api/course/instructorCourses";
import { Tables } from "@/types/database.types";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import { useInstructorCourses } from "@/queries/useInstructorCourses";

export default function Page() {
  const {
    data: user,
  } = useCurrentUser();

  const { data: courses, isLoading, error } = useInstructorCourses(user?.user_id || "");
  if (isLoading) return     <div className="ml-[20rem] mt-[10rem]">
  <Player
    className="m-auto"
    autoplay
    loop
    src="/AnimationLoading.json"
    style={{ height: "20rem", width: "20rem" }}
  />
</div>;
  return (
    <div className="flex flex-col gap-5  justify-center  w-[60rem]">
      <h1 className="text-2xl font-semibold text-center">Owned Courses</h1>
      {courses?.length === 0 ? (
        <p>You don't own any courses.</p>
      ) : (
        <ul className="flex flex-row justify-center w-full flex-wrap gap-5 py-5 m-auto">
          {courses?.map((course: Tables<"courses">, index: number) => (
            <Card key={index} course={course} width="w-[15rem]" />
          ))}
        </ul>
      )}
    </div>
  );
}
