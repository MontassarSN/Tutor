import { fetchInstructors } from "@/api/users/instructors/instructorsdata";

export const IntructorsQuery ={
    queryKey: ["instructors"],
    queryFn: async () => await fetchInstructors(),
  };