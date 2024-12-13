"use client";
import { Tables } from "@/types/database.types";
import React, { ChangeEvent, useEffect } from "react";

interface CourseAudienceProps {
  data: Tables<"courses"> | undefined | null;
  audience: string[];
  setAudience: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CourseAudience({
  audience,
  setAudience,
  data,
}: CourseAudienceProps) {
  useEffect(() => {
    setAudience(data?.audience || []);
  }, [data?.audience, setAudience]);

  const handleInputChange = (index: number, value: string) => {
    const newAudience = [...audience];
    newAudience[index] = value;
    setAudience(newAudience);
  };

  const handleAddInput = () => {
    if (audience.length < 8) {
      setAudience([...audience, ""]);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-5">
      <div className="flex justify-between w-full">
        <div className="text-lg font-semibold">
          Target Audience ({audience.length}/8)
        </div>
        {audience.length < 8 && (
          <button
            type="button" // Prevent form submission
            className="text-orange-500 mt-2"
            onClick={handleAddInput}
          >
            + Add new
          </button>
        )}
      </div>

      {audience.map((input, index) => (
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
              placeholder="Who this course is for..."
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
