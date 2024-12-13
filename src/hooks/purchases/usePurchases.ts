"use client";
import { useQuery } from "@tanstack/react-query";
import { instructorPuchasesQuery } from "./purchasesQuery";

export default function useInstructorPurchases() {
  return useQuery(instructorPuchasesQuery); 
}
