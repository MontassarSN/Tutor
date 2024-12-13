"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import EditLecture from "./editLecture";

import Video from "./video";
import { useLecturesContext } from "./context/LecturesContext";
import LectureMenu from "./lectureMenu";

interface LectureListProps {
  sectionId: string;
}

export default function LectureList({ sectionId }: LectureListProps) {
  const { newLectures, setNewLectures } = useLecturesContext();
  const [sectionLectures, setSectionLectures] = useState<Tables<"lectures">[]>(
    []
  );

  useEffect(() => {
    if (newLectures) {
      setSectionLectures(
        newLectures.filter((lecture) => lecture.section_id === sectionId)
      );
    }
  }, [newLectures]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedLectures = Array.from(sectionLectures);
    const [movedLecture] = reorderedLectures.splice(source.index, 1);
    reorderedLectures.splice(destination.index, 0, movedLecture);

    const updatedLectures = reorderedLectures.map((lecture, index) => ({
      ...lecture,
      order: index + 1,
    }));
    setSectionLectures(updatedLectures);
    setNewLectures((prevLectures) =>
      prevLectures
        .filter((lecture) => lecture.section_id !== sectionId)
        .concat(updatedLectures)
    );
  };

  const handleUpdateLecture = (id: string, column: string, value: any) => {
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === id ? { ...lecture, [column]: value } : lecture
      )
    );
  };

  const handleDeleteLecture = async (id: string) => {
    setSectionLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.id !== id)
    );
    setNewLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.id !== id)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={`lectures-${sectionId}`} type="LECTURE">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 py-3 px-2"
          >
            {sectionLectures.map((lecture, index) => (
              <Draggable
                key={lecture.id}
                draggableId={`lecture-${lecture.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex justify-between items-center p-2 bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/AddCourse/Menu2.png"
                        alt="Menu"
                        width={18}
                        height={18}
                      />
                      <span className="font-semibold">{lecture.title}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <LectureMenu lecture={lecture} />

                      <EditLecture
                        lectureid={lecture.id}
                        Lecturetitle={lecture.title as string}
                        handleUpdateLecture={handleUpdateLecture}
                      />
                      <Image
                        className="my-auto cursor-pointer"
                        src="/AddCourse/Trash.png"
                        alt="Trash"
                        width={18}
                        height={18}
                        onClick={() => handleDeleteLecture(lecture.id)} // Add delete handler
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
