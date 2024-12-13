// src/components/ResearchForCourses.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearch } from "../Contexts/SearchContext";
import Card from "./Card";
import { useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/types/database.types";
import Pagination from "@mui/material/Pagination";
import useCourses from "@/queries/useCourses";
import { coursesQuery } from "@/queries/CoursesQuery";
import { Player } from "@lottiefiles/react-lottie-player";

const ResearchForCourses: React.FC = () => {
  const { searchQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { data: courses, isLoading } = useCourses({
    page: page,
    limit: 10,
    search: { column: "title", value: searchQuery },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (courses?.meta?.has_next_page) {
      queryClient.prefetchQuery(
        coursesQuery({
          page: page + 1,
          limit: 10,
        })
      );
    }
  }, [page, courses?.meta?.has_next_page, queryClient]);

  if (isLoading)
    return (
      <Player
        className="m-auto"
        autoplay
        loop
        src="/AnimationLoading.json"
        style={{ height: "20rem", width: "20rem" }}
      />
    );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-start w-5/6 flex-wrap gap-5 m-auto py-10">
        {courses?.data.map((course: Tables<"courses">) => (
          <Card key={course.id} course={course} width="w-[18%]" />
        ))}
      </div>
      <Pagination
        dir="ltr"
        className="flex w-full justify-center mb-5"
        count={courses?.meta.total_pages}
        page={page}
        boundaryCount={1}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};

export default ResearchForCourses;
