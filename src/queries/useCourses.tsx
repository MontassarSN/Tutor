"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../api/coursesdata";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => await fetchCourses(),
  });
};
