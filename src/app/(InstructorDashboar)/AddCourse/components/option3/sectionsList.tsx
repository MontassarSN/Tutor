"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import AddLecture from "./addLecture";
import EditSection from "./editSection";
import LectureList from "./lectureList";
import { useSectionsContext } from "./context/SectionsContext";
import { useLecturesContext } from "./context/LecturesContext";

export default function SectionsList() {
  const { newSections, setNewSections } = useSectionsContext();
  const { newLectures, setNewLectures } = useLecturesContext();

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedSections = Array.from(newSections);
    const [movedSection] = reorderedSections.splice(source.index, 1);
    reorderedSections.splice(destination.index, 0, movedSection);
    const updatedSections = reorderedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    setNewSections(updatedSections);
  };

  const handleDeleteSection = async (sectionId: string) => {
    setNewSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId)
    );

    const updatedSections = newSections
      .filter((section) => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index + 1 }));

    setNewSections(updatedSections);
    setNewLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.section_id !== sectionId)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections" type="SECTION">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3 bg-gray-50"
          >
            {newSections.map((section, index) => {
              return (
                <Draggable
                  key={section.id}
                  draggableId={`section-${section.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white shadow-sm p-3 rounded shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/AddCourse/Menu.png"
                            alt="Menu"
                            width={18}
                            height={18}
                          />
                          <div className="flex gap-1 items-center font-semibold">
                            Sections{" "}
                            <span className="flex">{section.order}:</span>
                          </div>
                          <span>{section.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AddLecture sectionId={section.id} />
                          <EditSection
                            sectionId={section.id}
                            sectiontitle={section.title as string}
                          />
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                          >
                            <Image
                              src="/AddCourse/Trash.png"
                              alt="Trash"
                              width={18}
                              height={18}
                            />
                          </button>
                        </div>
                      </div>
                      <LectureList sectionId={section.id} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
