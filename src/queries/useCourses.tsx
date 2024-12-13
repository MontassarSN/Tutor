"use client";
import { useQuery } from "@tanstack/react-query";
import { coursesQuery, CoursesQueryType } from "./CoursesQuery";

export default function useCourses({
  page,
  limit,
  search,
  filters,
}: CoursesQueryType) {
  return useQuery(coursesQuery({page, limit, search,filters}));
}
