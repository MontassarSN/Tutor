import { fetchUsers } from "@/api/users/usersdata";

export const UsersQuery ={
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  };