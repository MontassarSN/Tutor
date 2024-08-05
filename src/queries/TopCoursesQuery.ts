import { fetchTop10Courses } from "@/api/course/fetchTop10Courses";

export const TopCoursesQuery = {queryKey:["topCourses",10],
    queryFn: async () => await fetchTop10Courses()};