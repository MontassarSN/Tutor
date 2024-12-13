"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLecturesContext } from "./context/LecturesContext";

interface CaptionProps {
  lectureId: string;
  initialCaption: string | null;
}

export default function Caption({ lectureId, initialCaption }: CaptionProps) {
  const { setNewLectures } = useLecturesContext();
  const [caption, setCaption] = useState<string>(initialCaption || "");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialCaption) {
      setCaption(initialCaption);
    }
  }, [initialCaption]);

  const handleCancel = () => {
    setCaption(initialCaption || "");
    setIsDialogOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId ? { ...lecture, captions : caption } : lecture
      )
    );
    setIsDialogOpen(false);
  };

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCaption(event.target.value);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-gray-700 text-sm px-2 py-1 cursor-pointer">
          Caption
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lecture Caption</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold">Caption</label>
            <textarea
              value={caption}
              onChange={handleCaptionChange}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none "
              placeholder="Enter lecture caption here..."
            />
          </div>
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
