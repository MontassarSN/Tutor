import fetchActiveUser from "@/api/users/fetchUser";

export const ActiveUserQuery ={
    queryKey: ["user", "active"],
    queryFn: async () => await fetchActiveUser(),
  };