"use client";
import React from "react";
import { Course } from "../../../types/Types";
import Card from "../../../components/Card"; // Import the Card component
import { useCourses } from "@/queries/useCourses";

export default function RecentlyAdded() {
  const { data: courses, isLoading, isError } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching courses</div>;

  if (!courses) return <div>No courses available</div>; // Type guard to handle undefined courses

  const sortedCoursesByDate = courses.data?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Take the top 4 newest courses
  const Top4NewestCourses: Course[] | undefined = sortedCoursesByDate?.slice(
    0,
    4
  );
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center">
      <h1 className="text-3xl font-semibold align-middle py-10">
        Recently added courses
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top4NewestCourses?.map((course: Course, index: number) => (
          <Card key={index} course={course} width="w-[23%]" />
          // Here, you pass course data and width as props to the Card component
        ))}
      </div>
    </div>
  );
}
