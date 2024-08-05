"use client";
import { getCourseDataById } from '@/api/getCourseDataById';
import { useQuery } from '@tanstack/react-query';

// Define the custom hook
export function useCourseData(courseId: number) {
  return useQuery(
    {   queryKey: ["course", courseId],
        queryFn: async () => await getCourseDataById(courseId),
      });
}
