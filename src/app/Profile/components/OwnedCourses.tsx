import React from "react";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "@/queries/useCurrentUser";
import Card from "@/components/Card";
import { FetchInstructorCourses } from "@/api/instructorCourses";
import { Tables } from "@/types/database.types";
import Link from "next/link";

export default function OwnedCourses() {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["instructorCourses", user?.user_id],
    queryFn: () => FetchInstructorCourses(user?.user_id!),
    enabled: !!user?.user_id, // Ensure the query runs only if user_id is available
  });

  if (userLoading || isLoading) return <div>Loading...</div>;
  if (userError || error) return <div>Error: {userError?.message || error?.message}</div>;

  return (
    <div className="flex flex-col gap-5 w-[70rem] justify-center m-auto">
      <div className="top-0 pl-20">
        <Link href="/AddCourse">add course</Link>
      </div>
      <h1 className="text-2xl font-semibold text-center">Owned Courses</h1>
      {courses?.length === 0 ? (
        <p>You don't own any courses.</p>
      ) : (
        <ul className="flex flex-row justify-center w-full flex-wrap gap-5 py-5 m-auto">
          {courses?.map((course: Tables<"courses">, index: number) => (
            <Card key={index} course={course} width="w-[20rem]" />
          ))}
        </ul>
      )}
    </div>
  );
}
