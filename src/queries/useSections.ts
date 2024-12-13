"use client";
import { fetchSectionsByCourseId } from "@/api/course/sections/getCourseSections";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export function useSectionsData(courseId: string | null) {
  return useQuery({
    queryKey: ["sections",courseId],
    queryFn: async () => await fetchSectionsByCourseId(courseId as string),
    enabled: !!courseId,
  });
}
