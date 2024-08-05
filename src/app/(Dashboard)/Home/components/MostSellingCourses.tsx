"use client";
import React from "react";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import { TopCoursesQuery } from "@/queries/TopCoursesQuery";
import { Tables } from "@/types/database.types";



export default function MostSellingCourses() {
  const { data: Top10Courses } = useQuery(TopCoursesQuery
   );
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center">
      <h1 className="text-3xl font-semibold align-middle py-10">
        Most Selling Courses
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top10Courses?.map((course: Tables<"courses">, index: number) => (
          <Card key={index} course={course} width="w-[18%]" />
        ))}
      </div>
    </div>
  );
}
