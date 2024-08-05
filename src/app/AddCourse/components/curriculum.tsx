"use client";
import { useToast } from "@/components/ui/use-toast";
import { useSectionsData } from "@/queries/useSections";
import { useSearchParams } from "next/navigation";
import React from "react";
import SectionsList from "./sectionsList";
import { Tables } from "@/types/database.types";

export default function Curriculum() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const parsedCourseId = courseId ? parseInt(courseId, 10) : null; // Convert courseId to number
  const { toast } = useToast();
  const { data: sectionsData } = useSectionsData(parsedCourseId);

  return (
    <div className="py-5 px-10 flex flex-col gap-5 w-[60rem]">
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">Advance Informations</div>
        <div className="flex gap-2">
          <button className="bg-customBg text-customText font-semibold py-2 px-4">
            Save
          </button>
          <button className="text-customText font-semibold py-2 px-4">
            Save Preview
          </button>
        </div>
      </div>
      <SectionsList
        sections={
          sectionsData as (Tables<"sections"> & {
            lectures: Tables<"lectures">[];
          })[]
        }
      />
      <button className="bg-customBg text-customText font-semibold py-2 px-4">
        Add Sections
      </button>
    </div>
  );
}
