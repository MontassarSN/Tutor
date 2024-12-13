"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLecturesContext } from "./context/LecturesContext";
import { uploadFiles } from "@/hooks/useFileUpload";

interface FileProps {
  lectureId: string;
  Lecturefile: string | null;
}

// Define a mapping of file types to icons
const fileIcons: Record<string, string> = {
  "text/plain": "/icons/fichier-txt.png", // .txt files
  "application/pdf": "/icons/fichier-pdf.png", // .pdf files
  "default": "/icons/default-icon.svg", // default icon
};

export default function File({ lectureId, Lecturefile }: FileProps) {
  const { setNewLectures } = useLecturesContext();
  const [dragging, setDragging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(Lecturefile);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileIcon, setFileIcon] = useState<string | null>(null);
  const dropzoneRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const descriptionId = "dialog-description"; // Unique ID for the description

  useEffect(() => {
    if (Lecturefile) {
      // Set the initial state when the file is loaded from the database
      const fileExtension = Lecturefile.split(".").pop();
      const type = fileExtension === "pdf" ? "application/pdf" : "text/plain";
      setFileName(Lecturefile.split("/").pop() || "Uploaded File");
      setFileIcon(fileIcons[type] || fileIcons["default"]);
    }
  }, [Lecturefile]);

  const handleFileUpload = (file: File) => {
    const allowedTypes = ["application/pdf", "text/plain"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF and TXT files are allowed.");
      return;
    }

    setError(null); // Clear any previous error
    setFileName(file.name); // Update the file name

    // Determine the file icon based on the file type
    setFileIcon(fileIcons[file.type] || fileIcons["default"]);

    // Set new lecture data with the file object
    setNewLectures((prevLectures) =>
        prevLectures.map((lecture) =>
          lecture.id === lectureId ? { ...lecture, file: "" } : lecture
        )
      );
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    []
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File | null;

    if (file) {
      const allowedTypes = ["application/pdf", "text/plain"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only PDF and TXT files are allowed.");
        return;
      }

      setError(null); // Clear any previous error
      const urls = await uploadFiles(formData);
      const fileUrl = urls["file"];

      setNewLectures((prevLectures) =>
        prevLectures.map((lecture) =>
          lecture.id === lectureId ? { ...lecture, file: fileUrl } : lecture
        )
      );

      setIsDialogOpen(false); // Close the dialog on submit
    }
  };

  const handleCancel = () => {
    setNewLectures((prevLectures) =>
      prevLectures.map((lecture) =>
        lecture.id === lectureId ? { ...lecture, file: Lecturefile || "" } : lecture
      )
    );
    setIsDialogOpen(false); // Close the dialog on cancel
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-gray-700 text-sm px-2 py-1 cursor-pointer">
          File
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={descriptionId}>
        <DialogHeader>
          <DialogTitle>Lecture File</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div
            ref={dropzoneRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex flex-col items-center justify-center border border-gray-300 p-4 ${
              dragging ? "bg-gray-200" : ""
            }`}
            style={{ minHeight: "100px", minWidth: "100px" }}
          >
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
                className="hidden"
                name="file"
                accept=".pdf,.txt" // Restrict file input to .pdf and .txt files
              />
              <div className="flex flex-col gap-2">
                <div className="text-center font-semibold" >Attach File</div>
              <div className="text-gray-500 text-xs mb-2"> Drag & Drop File Here (PDF or TXT only)</div>
              </div>
   
              {fileIcon && fileName && (
                <div className="flex items-center gap-2">
                  <img
                    src={fileIcon}
                    alt="File Icon"
                    className="w-8 h-8 object-cover"
                  />
                  <span className="text-gray-700">{fileName}</span>
                </div>
              )}
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
            <button
              type="button"
              className="bg-gray-100 text-gray-600 py-2 px-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50 font-semibold py-2 px-4"
            >
              Attach File
            </button>
            </div>


          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
