// src/components/ResearchForCourses.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearch } from "../Contexts/SearchContext";
import { useCourses } from "@/queries/useCourses";
import Card from "./Card";
import { useQueryClient } from "@tanstack/react-query";
import { CoursesQuery } from "@/queries/CoursesQuery";

const ResearchForCourses: React.FC = () => {
  const queryClient = useQueryClient();
  const { searchQuery } = useSearch();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    queryClient.prefetchQuery(CoursesQuery(page + 1, pageSize));
  }, [page]);

  const { data: courses, isLoading, isError } = useCourses(page, pageSize);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching courses</div>;
  if (!courses || courses.length === 0) return <div>No courses available</div>;

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-start w-5/6 flex-wrap gap-5 m-auto py-10">
        {filteredCourses.map((course) => (
          <Card key={course.id} course={course} width="w-[18%]" />
        ))}
      </div>
      <div className="flex justify-between w-full max-w-2xl my-5">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={filteredCourses.length < 10}
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResearchForCourses;
