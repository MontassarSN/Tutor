"use client";
import { useQuery } from "@tanstack/react-query";
import { IntructorsQuery } from "./InstructorsQuery";

export const useInstructors = () => {
  return useQuery(IntructorsQuery);
};
