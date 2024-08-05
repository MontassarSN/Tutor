"use client";
import { useQuery } from "@tanstack/react-query";
import { LabelcolorsQuery } from "./LabelcolorsQuery";

export const useLabelcolors = () => {
  return useQuery(LabelcolorsQuery);
};
