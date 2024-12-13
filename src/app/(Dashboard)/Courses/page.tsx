"use client";

import React from "react";
import ResearchForCourses from "@/components/ResearchForCourses";
import { SearchProvider, useSearch } from "@/Contexts/SearchContext";
export default function Page() {
  return (
    <div className="bg-white shadow-sm text-black">
      <ResearchForCourses />
    </div>
  );
}
