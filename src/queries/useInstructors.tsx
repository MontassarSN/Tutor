"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchInstructors } from "../api/instructorsdata";

export const useInstructors = () => {
  return useQuery({
    queryKey: ["Instructors"],
    queryFn: async () => await fetchInstructors(),
  });
};
