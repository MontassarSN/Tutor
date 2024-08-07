import { useState } from 'react';
import { Tables } from '@/types/database.types';
import Image from 'next/image';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddSectionProps {
  sections: (Tables<"sections"> & {
    lectures: Tables<"lectures">[] | undefined;
  })[];
  onAddSection: (newSection: Tables<"sections"> & {
    lectures: Tables<"lectures">[];}) => void; // Callback function to handle adding a new section
}

export default function AddSection({ sections, onAddSection }: AddSectionProps) {
  const [newSectionTitle, setNewSectionTitle] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewSectionTitle(e.target.value);
  }

  function addSection() {
    if (newSectionTitle.trim()) {
      const newSection: Tables<"sections"> & {
    lectures: Tables<"lectures">[] ;
  } = {
        course_id: null, // Assuming course_id should be null or some valid value
        created_at: new Date().toISOString(), // Set current date as created_at
        id: sections.length + 1, // Generate a new ID or use your logic to get a unique ID
        order: sections.length + 1, // Set order if needed
        title: newSectionTitle,
        lectures: [], // Assuming lectures should be an empty array;
      };

      onAddSection(newSection); // Notify the parent component to add the new section
      setNewSectionTitle(''); // Clear the input field
    }
  }

  return (
    <div className='flex justify-center w-full'>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-customBg text-customText font-semibold py-2 px-4 w-full">
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
            <div className='flex justify-between w-full'>
              <button
                className="bg-gray-100 text-gray-600 py-2 px-3"
                onClick={() => setNewSectionTitle('')} // Clear the input field
              >
                Cancel
              </button>
              <button
                className="bg-customText text-white py-2 px-4"
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
