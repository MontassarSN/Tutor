import fetchActiveUser from "@/api/fetchUser";

export const ActiveUserQuery ={
    queryKey: ["user", "active"],
    queryFn: async () => await fetchActiveUser(),
  };