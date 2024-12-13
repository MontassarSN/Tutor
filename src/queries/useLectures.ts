"use client";
import { fetchLecturesByCourseId } from "@/api/course/lectures/fetchLecturesByCourseId";
import { useQuery } from "@tanstack/react-query";
export function useLectures(courseId: string) {
  return useQuery({
    queryKey: ["lectures", courseId],
    queryFn: async () => await fetchLecturesByCourseId(courseId),
  });
}
