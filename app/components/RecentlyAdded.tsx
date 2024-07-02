// src/components/RecentlyAdded.tsx

import React from 'react';
import { Top4NewestCourses } from './Data';
import { Course } from '../Types';
import Card from './Card'; // Import the Card component

const RecentlyAdded: React.FC = () => {
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center">
      <h1 className="text-3xl font-semibold align-middle py-10">Recently added courses</h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top4NewestCourses.map((course: Course, index: number) => (
          <Card key={index} course={course} width="w-[23%]" />
          // Here, you pass course data and width as props to the Card component
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
