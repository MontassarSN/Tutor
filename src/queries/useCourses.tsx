"use client";
import { useQuery } from "@tanstack/react-query";
import { CoursesQuery } from "./CoursesQuery";

export const useCourses = (page: number, pageSize: number) => {
  return useQuery(CoursesQuery(page, pageSize));
};
