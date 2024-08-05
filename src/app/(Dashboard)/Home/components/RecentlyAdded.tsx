"use client";
import React from "react";
import Card from "@/components/Card"; // Import the Card component
import { NewestCoursesQuery } from "@/queries/NewestCoursesQuery";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
export default function RecentlyAdded() {
  const { data: Top4NewestCourses } = useQuery(NewestCoursesQuery
  );

  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center">
      <h1 className="text-3xl font-semibold align-middle py-10">
        Recently added courses
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top4NewestCourses?.map((course: Tables<"courses">, index: number) => (
          <Card key={index} course={course} width="w-[23%]" />
          // Here, you pass course data and width as props to the Card component
        ))}
      </div>
    </div>
  );
}
