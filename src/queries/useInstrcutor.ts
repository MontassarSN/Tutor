"use client";

import fetchInstructorById from "@/api/users/instructors/fetchInstructorById";
import { useQuery } from "@tanstack/react-query";

export function useInstructor(instructorId: string) {
  return useQuery({
    queryKey: ["instructors", instructorId],
    queryFn: async () => await fetchInstructorById(instructorId),
    enabled: !!instructorId,
  });
}
