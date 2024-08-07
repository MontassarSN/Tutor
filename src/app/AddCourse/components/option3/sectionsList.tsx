import { Tables } from "@/types/database.types";
import Image from "next/image";
import React from "react";
import AddLecture from "./addLecture";
import EditSection from "./editSection";
import LectureList from "./lectureList";

interface SectionWithLectures extends Tables<"sections"> {
  lectures: Tables<"lectures">[];
}

interface SectionsListProps {
  sections: SectionWithLectures[];
}

export default function SectionsList({ sections }: SectionsListProps) {
  return (
    <div className="flex flex-col gap-3 bg-gray-50">
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-2 items-center">
              <Image
                src="/AddCourse/Menu.png"
                alt="Menu"
                width={18}
                height={18}
              />
              <div className="flex gap-1 items-center font-semibold">
                Sections <span className="flex">{section.order}:</span>
              </div>
              <span>{section.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <AddLecture />
              <EditSection />
              <Image
                src="/AddCourse/Trash.png"
                alt="Trash"
                width={18}
                height={18}
              />
            </div>
          </div>
          <LectureList lectures={section.lectures} />
        </div>
      ))}
    </div>
  );
}
