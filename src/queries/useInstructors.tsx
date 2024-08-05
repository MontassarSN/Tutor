"use client";
import { useQuery } from "@tanstack/react-query";
import { IntructorsQuery } from "./InstructorQuery";

export const useInstructors = () => {
  return useQuery(IntructorsQuery);
};
