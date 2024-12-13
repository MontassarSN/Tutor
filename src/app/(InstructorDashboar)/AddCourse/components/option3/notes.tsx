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
import Image from "next/image";

interface NotesProps {
  lectureId: string;
  initialNotes: string | null;
}

export default function Notes({ lectureId, initialNotes }: NotesProps) {
  const { setNewLectures } = useLecturesContext();
  const [notes, setNotes] = useState<string>(initialNotes || "");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  const handleCancel = () => {
    setNotes(initialNotes || "");
    setDroppedFile(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId ? { ...lecture, notes } : lecture
      )
    );
    setIsDialogOpen(false);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      setDroppedFile(file);
      readTextFile(file);
    } else {
      console.error("Only text files are allowed");
    }
  };

  const readTextFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setNotes(text);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      setDroppedFile(file);
      readTextFile(file);
    } else {
      console.error("Only text files are allowed");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-gray-700 text-sm px-2 py-1 cursor-pointer">
          Notes
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lecture Notes</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div
            className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 rounded"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <label className="text-gray-600 font-semibold">Notes</label>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none"
              placeholder="Enter lecture notes here or drop a .txt file..."
            />
            {droppedFile ? (
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src="/icons/fichier-txt.png"
                  alt="File Icon"
                  className="w-8 h-8 object-cover"
                  width={20}
                  height={20}
                />
                <span className="text-sm text-gray-600">{droppedFile.name}</span>
                <button
                  type="button"
                  className="text-red-500 text-sm font-semibold ml-2"
                  onClick={() => {
                    setDroppedFile(null);
                    setNotes("");
                  }}
                >
                  Remove Dropped File
                </button>
              </div>
            ) : (
              <div className="mt-2 flex justify-center items-center">
                <label className="cursor-pointer text-blue-500 text-sm font-semibold">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  Upload a .txt file
                </label>
              </div>
            )}
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
