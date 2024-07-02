// src/components/MostSellingCourses.tsx

import React from 'react';
import { Top10Courses } from './Data';
import { Course } from '../Types';
import Card from './Card';

const MostSellingCourses: React.FC = () => {
  return (
    <div className="flex flex-col mt-10 gap-5 w-3/4 m-auto items-center py-5 justify-center">
      <h1 className="text-3xl font-semibold align-middle py-10">Most Selling Courses</h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-5">
        {Top10Courses.map((course: Course, index: number) => (
          <Card key={index} course={course} width="w-[18%]" />
        ))}
      </div>
    </div>
  );
};

export default MostSellingCourses;
