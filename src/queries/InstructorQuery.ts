import fetchInstructorData from "@/api/users/instructors/fetchInstructorData";
import { UseQueryOptions } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";

export const instructorQuery = (
  id: string | undefined | null
): UseQueryOptions<Tables<"instructors">> => ({
  queryKey: ["instructors", id],
  queryFn: async () => await fetchInstructorData(id as string),
  enabled: id !== undefined  ,
  
});
