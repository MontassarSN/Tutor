"use client";
import fetchCourseComments from "@/api/course/fetchCourseComments";
import { fetchLecturesByCourseId } from "@/api/course/lectures/fetchLecturesByCourseId";
import { useQuery } from "@tanstack/react-query";
export function useComments(courseId: string) {
  return useQuery({
    queryKey: ["comments", courseId],
    queryFn: async () => await fetchCourseComments(courseId),
  });
}
