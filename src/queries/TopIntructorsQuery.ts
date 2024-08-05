import { fetchTop5Instructors } from "@/api/fetchTop5Instructors";

export const TopIntructorsQuery = {queryKey:["topInstructors",5],
    queryFn: async () => await fetchTop5Instructors()};