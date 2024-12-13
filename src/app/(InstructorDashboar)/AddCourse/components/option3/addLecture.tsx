import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/types/database.types";
import { v4 as uuidv4 } from 'uuid';
import { useLecturesContext } from "./context/LecturesContext";
import { useSearchParams } from "next/navigation";


interface AddLectureProps {
  sectionId: string;
}

export default function AddLecture({
  sectionId,
}: AddLectureProps) {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { newLectures, setNewLectures } = useLecturesContext();
  const [title, setTitle] = useState("");


  const handleAddLecture = () => {
    if (title.trim()) {
      // Determine the highest order among the existing lectures
      const highestOrder = newLectures.reduce(
        (maxOrder, lecture) => (lecture.order !== null && lecture.order > maxOrder ? lecture.order : maxOrder),
        0
      );

      const newLecture: Tables<"lectures"> = {
        course_id: courseId as string,
        created_at: "", 
        id: uuidv4(), 
        title,
        section_id: sectionId,
        description: null,
        notes: null,
        order: highestOrder + 1, 
        video_url: null,
        captions : null,
        file: null,
      };
      setNewLectures([...newLectures, newLecture]);
      setTitle("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src="/AddCourse/Plus.png"
          alt="Plus"
          width={18}
          height={18}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Lecture</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
        />
        <DialogFooter>
          <div className="flex justify-between w-full">
            <button
              className="bg-gray-100 text-gray-600 py-2 px-3"
              onClick={() => setTitle("")}
            >
              Cancel
            </button>
            <button
              className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4"
              onClick={handleAddLecture}
            >
              Add Lecture
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
