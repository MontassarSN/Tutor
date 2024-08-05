import { fetchUsers } from "@/api/usersdata";

export const UsersQuery ={
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  };