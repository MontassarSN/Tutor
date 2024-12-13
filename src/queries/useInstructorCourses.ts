"use client";
import { FetchInstructorCourses } from "@/api/course/instructorCourses";
import { useQuery } from "@tanstack/react-query";
export function useInstructorCourses(id: string) {
  return useQuery({
      queryKey: ["instructorCourses",id],
      queryFn: () => FetchInstructorCourses(id),
      enabled: !!id,
    });
}




















