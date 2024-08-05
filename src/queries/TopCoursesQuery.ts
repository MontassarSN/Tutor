import { fetchTop10Courses } from "@/api/fetchTop10Courses";

export const TopCoursesQuery = {queryKey:["topCourses",10],
    queryFn: async () => await fetchTop10Courses()};