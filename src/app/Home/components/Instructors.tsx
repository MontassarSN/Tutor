import React from "react";
import Image from "next/image";
import { instructors } from "../../../db/Data";

export default function Instructors() {
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center bg-white p-4">
      <h1 className="text-3xl font-semibold align-middle py-10">
        Most Selling Instructors
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {instructors.map((instructor, index) => (
          <div
            key={index}
            className="flex flex-col w-[18%] gap-4 items-center bg-white border-2 border-gray-200"
          >
            <div className="relative h-56 w-full">
              <Image
                src={instructor.pic}
                alt="Instructor"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="text-sm font-semibold">{instructor.name}</div>
            <div className="text-xs text-gray-500">{instructor.title}</div>
            <div className="flex flex-row items-center justify-between w-full border-t-2 py-2 px-2 border-gray-200 mt-auto">
              <h1>⭐{instructor.raiting}</h1>
              <h1 className="text-gray-700 text-sm">
                {instructor.students}{" "}
                <span className="text-xs text-gray-400">Students</span>
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5 m-auto">
        We have more categories and subcategories.{" "}
        <a className="text-customText pl-3" href="#">
          Browse All →
        </a>
      </div>
    </div>
  );
}
