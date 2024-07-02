import React from 'react';
import { useSearch } from './SearchContext';
import { courses } from './Data';
import Image from 'next/image'; // Import Image from 'next/image'

const ResearchForCourses: React.FC = () => {
  const { searchQuery } = useSearch();

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-row justify-center w-5/6 flex-wrap gap-5 m-auto">
      {filteredCourses.map((course, index) => (
        <div
          key={index} // Use a unique key for each mapped course
          className="flex flex-col w-[18%] gap-2 items-center px-2 bg-white border-2 border-gray-200"
        >
          {/* Use Next.js Image component */}
          <div className="relative h-48 w-full">
            <Image
              src={course.pic}
              alt={`Course ${index + 1}`} // Provide meaningful alt text
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-grow flex-col justify-between w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <div className={`text-xs px-2 py-1 ${course.colors}`}>{course.label}</div>
              <h1 className="text-semibold text-customText">{course.price}</h1>
            </div>
            <div className="text-sm font-semibold">{course.title}</div>
          </div>
          <div className="flex flex-row items-center justify-between w-full border-t-2 py-2 border-gray-200 mt-auto">
            <h1>{course.stars}</h1>
            <h1 className="text-gray-700">{course.students} <span className="text-gray-400">Students</span></h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResearchForCourses;
