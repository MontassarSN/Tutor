"use client";
import { Tables } from '@/types/database.types';
import React, { ChangeEvent, useEffect } from 'react';

interface CourseSubjectsProps {
  data: Tables<'courses'>;
  subjects: string[];
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CourseSubjects({ subjects, setSubjects , data }: CourseSubjectsProps) {
  useEffect(() => {
    setSubjects(data?.subjects || []);
  }, [data?.subjects, setSubjects]);

  const handleInputChange = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const handleAddInput = () => {
    if (subjects.length < 8) {
      setSubjects([...subjects, '']);
    }
  };

  return (
    <div className='flex flex-col gap-3 py-5'>
      <div className='flex justify-between w-full'>
        <div className="text-lg font-semibold">What you will teach in this course ({subjects.length}/8)</div>
        {subjects.length < 8 && (
          <button
            type="button" // Prevent form submission
            className="text-orange-500 mt-2"
            onClick={handleAddInput}
          >
            + Add new
          </button>
        )}
      </div>
     
      {subjects.map((input, index) => (
        <div key={index} className="flex flex-col gap-2 relative">
          <label>{index + 1 < 10 ? `0${index + 1}` : index + 1}</label>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
              className="border p-2 w-full pr-10"
              placeholder="What you will teach in this course..."
              maxLength={120}
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-900">{input.length}/120</span>
          </div>
        </div>
      ))}
    </div>
  );
}
