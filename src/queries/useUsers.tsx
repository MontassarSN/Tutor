"use client";
import { useQuery } from "@tanstack/react-query";
import { UsersQuery } from "./UsersQuery";

export const useUsers = () => {
  return useQuery(UsersQuery);
};
