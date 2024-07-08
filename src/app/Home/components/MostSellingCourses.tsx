// src/components/MostSellingCourses.tsx

import React from 'react';
import { Course } from '../../Types';
import Card from '../../../components/Card';
import { useCourses } from '../../../app/coursesdata';

export default function MostSellingCourses() {
  const { data: courses, isLoading, isError } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching courses</div>;

  if (!courses) return <div>No courses available</div>;

  function parseStudents(students: string): number {
    if (students.endsWith('K')) {
      return parseFloat(students) * 1000;
    }
    return parseFloat(students);
  }

  const sortedCourses = [...courses].sort((a, b) => parseStudents(b.students) - parseStudents(a.students));

  // Take the top 10 courses
  const Top10Courses: Course[] = sortedCourses.slice(0, 10);

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
}
