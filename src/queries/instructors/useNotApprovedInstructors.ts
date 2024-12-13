"use client";
import { useQuery } from "@tanstack/react-query";
import { notApprovedIntructorsQuery } from "./notApprovedQuery";

export const useNotApprovedInstructors = () => {
  return useQuery(notApprovedIntructorsQuery);
};
