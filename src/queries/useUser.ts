"use client";

import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
import fetchUserById from "@/api/users/fetchUserById";

export function useUser(id: string | undefined | null) {
  return useQuery<Tables<"users">>(
    {
        queryKey: ["users",id],
        queryFn: async () => await fetchUserById(id as string),
        enabled: id!== null,
  
        },  
  );
}
