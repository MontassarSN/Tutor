"use client";
import React from "react";
import Image from "next/image";
import InstructorCard from "@/components/InstructorCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { TopIntructorsQuery } from "@/queries/TopIntructorsQuery";
import { Tables } from "@/types/database.types";

export default function TopInstructors() {
  const {data: Top5instructors} = useQuery(TopIntructorsQuery);
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center bg-white p-4">
      <h1 className="text-3xl font-semibold align-middle py-10">
        Most Selling Instructors
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top5instructors?.map((instructor: Tables<"instructors">, index: number) => (
          <InstructorCard key={index} instructor={instructor} width="w-[18%]" />
        ))}
      </div>
      <div className="py-5 m-auto">
        We have more categories and subcategories.{" "}
        <Link href="/Instructors" className="text-customText pl-2">
           Browse All →
        </Link>
      </div>
    </div>
  );
}
