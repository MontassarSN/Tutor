"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSectionsData } from "@/queries/useSections";
import { useSectionsContext } from "./context/SectionsContext";
import { useLecturesContext } from "./context/LecturesContext";
import { useLectures } from "@/queries/useLectures";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import SectionsList from "./sectionsList";
import AddSection from "./addSection";
import { useToast } from "@/components/ui/use-toast";
import { deleteLecture } from "@/api/course/lectures/deleteLecture";
import { updateLecture } from "@/api/course/lectures/updateLecture";
import { InsertSection } from "@/api/course/sections/insertSection";
import { deleteSection } from "@/api/course/sections/deleteSection";
import { updateSection } from "@/api/course/sections/updateSection";
import { InsertLecture } from "@/api/course/lectures/insertLecture";
import { useFilesContext } from "./context/FilesContext";
import { Tables } from "@/types/database.types";
import { useOption } from "../../context/OptionContext";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Curriculum({
  setValidsCount3,
}: {
  setValidsCount3: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setSelectedOption } = useOption();
  const queryClient = useQueryClient();

  

  const { toast } = useToast();
  const { newSections, setNewSections } = useSectionsContext();
  const { newLectures, setNewLectures } = useLecturesContext();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const { data: sections ,isFetching :fetchingSections  } = useSectionsData(courseId);
  const { data: lectures ,isFetching :fetchingLectures  } = useLectures(courseId as string);


  useEffect(() => {
    if (sections) {
      setNewSections(sections);
    }
    if (lectures) {
      setNewLectures(lectures);
    }
  }, [sections, lectures]);

  const saveDataMutation = useMutation({
    mutationFn: async () => {
      if (!courseId) return;

      const { lecturesToDelete, lecturesToUpdate, newLecturesToInsert } =
        compareLectures({
          oldlectures: lectures ?? [],
          newLectures,
        });

      const phase1_promises = [];

      if (lecturesToDelete.length > 0) {
        phase1_promises.push(
          deleteLecture(lecturesToDelete.map((lecture) => lecture.id))
        );
      }
      if (lecturesToUpdate.length > 0) {
        lecturesToUpdate.map((lecture) =>
          phase1_promises.push(updateLecture(lecture.id, lecture))
        );
      }

      await Promise.all(phase1_promises);

      const { sectionsToDelete, sectionsToUpdate, newSectionsToInsert } =
        compareSections({
          oldSections: sections ?? [],
          newSections,
        });
      const phase2_promises = [];
      if (sectionsToDelete.length > 0) {
        phase2_promises.push(
          deleteSection(sectionsToDelete.map((section) => section.id))
        );
      }
      if (newSectionsToInsert.length > 0) {
        phase2_promises.push(InsertSection(newSectionsToInsert));
      }
      if (sectionsToUpdate.length > 0) {
        sectionsToUpdate.map((section) => updateSection(section));
      }

      await Promise.all(phase2_promises);

      if (newLecturesToInsert.length > 0) {
        await InsertLecture(newLecturesToInsert);
      }
    },

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Changes saved successfully",
        description: "Your course changes have been saved.",
      });
      queryClient.invalidateQueries({
        queryKey: ["sections",courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["lectures",courseId],
      });
      setSelectedOption("option4");
      
        },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Saving Course",
        description: "Check your network connection and try again.",
      });
      console.error("Error saving course:", error.message);
    },
  });

  return (
    <div className="py-5 px-10 flex flex-col gap-5 w-[60rem]">
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">Advance Informations</div>
        <div className="flex gap-2">
          <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4">
            Save
          </button>
          <button className="text-customText font-semibold py-2 px-4">
            Save Preview
          </button>
        </div>
      </div>
      {fetchingSections || fetchingLectures ? (
   
            <Player
              className="m-auto"
              autoplay
              loop
              src="/AnimationLoading.json"
              style={{ height: "20rem", width: "20rem" }}
            />
        ) : (
          <>
            <SectionsList />
            <AddSection />
          </>
        )}


      <div className="w-full flex justify-between">
        <button type="button" className="bg-gray-100 text-gray-600 py-2 px-3">
          Previous
        </button>
        <button
          type="submit"
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4 "
          onClick={() => saveDataMutation.mutate()}
        >
          Save & next
        </button>
      </div>
    </div>
  );
}
function compareLectures({
  oldlectures,
  newLectures,
}: {
  oldlectures: Tables<"lectures">[];
  newLectures: Tables<"lectures">[];
}): {
  newLecturesToInsert: Tables<"lectures">[];
  lecturesToUpdate: Tables<"lectures">[];
  lecturesToDelete: Tables<"lectures">[];
} {
  const newLecturesToInsert = [];
  const lecturesToUpdate = [];

  for (const lecture of newLectures) {
    const originalLecture = oldlectures?.find(
      (oldlecture) => oldlecture.id === lecture.id
    );
    if (!originalLecture) {
      newLecturesToInsert.push(lecture);
    }
    if (
      originalLecture &&
      JSON.stringify(lecture) !== JSON.stringify(originalLecture)
    ) {
      lecturesToUpdate.push(lecture);
    }
  }

  return {
    newLecturesToInsert,
    lecturesToUpdate,
    lecturesToDelete: oldlectures?.filter(
      (lecture) =>
        !newLectures.some((newLecture) => newLecture.id === lecture.id)
    ),
  };
}

function compareSections({
  oldSections,
  newSections,
}: {
  oldSections: Tables<"sections">[];
  newSections: Tables<"sections">[];
}) {
  const newSectionsToInsert = [];
  const sectionsToUpdate = [];

  for (const section of newSections) {
    const originalSection = oldSections?.find(
      (oldSection) => oldSection.id === section.id
    );
    if (!originalSection) {
      newSectionsToInsert.push(section);
    }
    if (
      originalSection &&
      JSON.stringify(section) !== JSON.stringify(originalSection)
    ) {
      sectionsToUpdate.push(section);
    }
  }

  return {
    newSectionsToInsert,
    sectionsToUpdate,
    sectionsToDelete: oldSections?.filter(
      (section) =>
        !newSections.some((newSection) => newSection.id === section.id)
    ),
  };
}
