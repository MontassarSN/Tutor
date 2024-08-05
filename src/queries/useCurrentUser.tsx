"use client";
import { useQuery } from "@tanstack/react-query";
import {ActiveUserQuery} from "./ActiveUserQuery";
export default function useCurrentUser() {
  return useQuery(ActiveUserQuery
);
}
