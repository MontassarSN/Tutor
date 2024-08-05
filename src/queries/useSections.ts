"use client";
import { fetchSectionsByCourseId } from "@/api/course/getCourseSections";
import { useQuery } from "@tanstack/react-query";

// Define the custom hook
export function useSectionsData(courseId: number | null) {
  return useQuery({
    queryKey: ["sections", courseId],
    queryFn: async () => await fetchSectionsByCourseId(courseId as number),
    enabled: !!courseId,
  });
}
