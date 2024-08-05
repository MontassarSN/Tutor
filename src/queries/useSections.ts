"use client";
import { fetchSectionsByCourseId } from '@/api/getCourseSections';
import { useQuery } from '@tanstack/react-query';

// Define the custom hook
export function useSectionsData(courseId: number) {
  return useQuery(
    {   queryKey: ["sections", courseId],
        queryFn: async () => await fetchSectionsByCourseId(courseId),
      });
}
