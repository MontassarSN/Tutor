"use client";
import { getCourseDataById } from "@/api/course/getCourseDataById";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export function useCourseData(courseId: string | null) {
  return useQuery({
    queryKey: ["courses",courseId],
    queryFn: async () => await getCourseDataById(courseId as string),
    enabled: !!courseId,
  });
}
