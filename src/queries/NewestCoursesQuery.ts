import {fetchRecentlyAddedCourses} from "@/api/course/fetchRecentlyAddedCourses";

export const NewestCoursesQuery = {
    queryKey: ["NewestCourses"],
    queryFn: async () => await fetchRecentlyAddedCourses()
};
