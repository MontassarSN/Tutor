"use client";

import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
import { instructorQuery } from "./instructorQuery";

export function useInstructoreData(id: string | undefined | null) {
  return useQuery<Tables<"instructors">>(instructorQuery(id));
}
