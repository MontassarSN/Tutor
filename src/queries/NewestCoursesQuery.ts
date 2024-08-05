import {fetchRecentlyAddedCourses} from "@/api/fetchRecentlyAddedCourses";

export const NewestCoursesQuery = {
    queryKey: ["NewestCourses"],
    queryFn: async () => await fetchRecentlyAddedCourses()
};
