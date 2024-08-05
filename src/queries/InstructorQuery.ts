import { fetchInstructors } from "@/api/instructorsdata";

export const IntructorsQuery ={
    queryKey: ["instructors"],
    queryFn: async () => await fetchInstructors(),
  };