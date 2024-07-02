import React from 'react';
import { Course } from '../Types';
import Image from 'next/image'; // Import next/image

interface CardProps {
  course: Course;
  width: string; // Example: "w-[23%]", passed as a Tailwind CSS class
}

const Card: React.FC<CardProps> = ({ course, width }) => {
  return (
    <div className={`flex flex-col ${width} gap-3 items-center px-2 border-2 border-gray-200`}>
      <div className="relative w-full h-48">
        <Image
          src={course.pic}
          alt="Course"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className={`text-xs px-2 py-1 ${course.colors}`}>{course.label}</div>
        <h1 className="text-semibold text-customText">{course.price}</h1>
      </div>
      <div className="text-sm font-semibold">{course.title}</div>
      <div className="flex flex-row items-center justify-between w-full border-t-2 py-2 border-gray-200 mt-auto">
        <h1>{course.stars}</h1>
        <h1 className="text-gray-700">{course.students} <span className="text-gray-400">Students</span></h1>
      </div>
    </div>
  );
};

export default Card;
