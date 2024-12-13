"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLecturesContext } from "./context/LecturesContext";

interface DescriptionProps {
  lectureId: string;
  initialDescription: string | null;
}

export default function Description({
  lectureId,
  initialDescription,
}: DescriptionProps) {
  const { setNewLectures } = useLecturesContext();
  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setDescription(initialDescription || "");
    setIsDialogOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId
          ? { ...lecture, description: description }
          : lecture
      )
    );
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-gray-700 text-sm px-2 py-1 cursor-pointer">
          Description
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lecture Description</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
            rows={5}
            placeholder="Enter lecture description..."
          />
          <DialogFooter>
            <button
              className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4"
              type="submit"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-100 text-gray-600 py-2 px-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
