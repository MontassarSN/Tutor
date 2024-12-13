"use client";
import { useState } from "react";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSectionsContext } from "./context/SectionsContext";
import { useSearchParams } from "next/navigation";
export default function AddSection() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { newSections, setNewSections } = useSectionsContext();
  const [newSectionTitle, setNewSectionTitle] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewSectionTitle(e.target.value);
  }

  function addSection() {
    if (newSectionTitle.trim()) {
      const newSection: Tables<"sections">  = {
        course_id: courseId, 
        created_at: new Date().toISOString(), // Set current date as created_at
        id: uuidv4(), // Generate a new UUID
        order: newSections.length + 1, // Set order if needed
        title: newSectionTitle,
      };

      setNewSections((prevSections) => [...prevSections, newSection]);
      setNewSectionTitle(""); // Clear the input field
    }
  }

  return (
    <div className="flex justify-center w-full">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4 w-full">
            Add Sections
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
          </DialogHeader>
          <div>Section</div>
          <input
            type="text"
            value={newSectionTitle}
            onChange={handleInputChange}
            placeholder="Section Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
          <DialogFooter>
            <div className="flex justify-between w-full">
              <button
                className="bg-gray-100 text-gray-600 py-2 px-3"
                onClick={() => setNewSectionTitle("")} // Clear the input field
              >
                Cancel
              </button>
              <button
                className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4"
                onClick={addSection}
              >
                Add Section
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
