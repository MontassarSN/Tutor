"use client" ;
import React, { useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import AddSection from './addSection';
import SectionsList from './sectionsList';
import { useSearchParams } from 'next/navigation';
import { useSectionsData } from '@/queries/useSections';

export default function Curriculum() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const parsedCourseId = courseId ? parseInt(courseId, 10) : null; // Convert courseId to number
  const { data: sections } = useSectionsData(parsedCourseId);
  const [sectionsData, setSectionsData] = useState<(Tables<"sections"> & {
    lectures: Tables<"lectures">[];
  })[]>([]);

  useEffect(() => {
    if (sections) {
      // Update the state when sections data is available
      setSectionsData(sections as (Tables<"sections"> & {
        lectures: Tables<"lectures">[];
      })[] );
    }
  }, [sections]);
  function handleAddSection(newSection: Tables<"sections"> & {
    lectures: Tables<"lectures">[];
  }) {
    setSectionsData(prevSections => [...prevSections, newSection]);
  }

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
      <SectionsList sections={sectionsData} />
      <AddSection sections={sectionsData} onAddSection={handleAddSection} />
      {/* Other components and content */}
    </div>
  );
}
