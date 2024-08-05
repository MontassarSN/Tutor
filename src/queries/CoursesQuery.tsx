import { fetchCourses } from "@/api/coursesdata";

export const CoursesQuery = (page: number, pageSize: number) => ({
  queryKey: ["courses", { page, pageSize }],
  queryFn: () => fetchCourses(page, pageSize),
  enabled: !!page && !!pageSize,
});
