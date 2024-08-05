"use client";
import { getCourseDataById } from "@/api/course/getCourseDataById";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export function useCourseData(courseId: number | null) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => await getCourseDataById(courseId as number),
    enabled: !!courseId,
  });
}
