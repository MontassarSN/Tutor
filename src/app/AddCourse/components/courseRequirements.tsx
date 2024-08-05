"use client";
import { Tables } from "@/types/database.types";
import React, { ChangeEvent, useEffect } from "react";

interface CourseRequirementsProps {
  data: Tables<"courses"> | undefined | null;
  requirements: string[];
  setRequirements: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CourseRequirements({
  requirements,
  setRequirements,
  data,
}: CourseRequirementsProps) {
  useEffect(() => {
    setRequirements(data?.requirements || []);
  }, [data?.requirements, setRequirements]);

  const handleInputChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleAddInput = () => {
    if (requirements.length < 8) {
      setRequirements([...requirements, ""]);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-5">
      <div className="flex justify-between w-full">
        <div className="text-lg font-semibold">
          Target Requirements ({requirements.length}/8)
        </div>
        {requirements.length < 8 && (
          <button
            type="button" // Prevent form submission
            className="text-orange-500 mt-2"
            onClick={handleAddInput}
          >
            + Add new
          </button>
        )}
      </div>

      {requirements.map((input, index) => (
        <div key={index} className="flex flex-col gap-2 relative">
          <label>{index + 1 < 10 ? `0${index + 1}` : index + 1}</label>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              className="border p-2 w-full pr-10"
              placeholder="Enter requirement..."
              maxLength={120}
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-900">
              {input.length}/120
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
