import { fetchNotApprovedInstructors } from "@/api/users/instructors/fetchNotApprovedInstructors";

export const notApprovedIntructorsQuery ={
    queryKey: ["instructors" , "notApproved"],
    queryFn: async () => await fetchNotApprovedInstructors(),
  };