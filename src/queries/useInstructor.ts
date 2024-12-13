"use client";

import { useQuery } from "@tanstack/react-query";
import { IntructorQuery } from "./instructorQuery";
import { Tables } from "@/types/database.types";

export function useInstructoreData(id: string | undefined | null) {
  return useQuery<Tables<"instructors">>(IntructorQuery(id));
}
