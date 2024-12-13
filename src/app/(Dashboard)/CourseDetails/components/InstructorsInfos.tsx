"use client" ;
import { useInstructorCourses } from '@/queries/useInstructorCourses';
import { Tables } from '@/types/database.types';
import Image from 'next/image';
import React from 'react';

export default function InstructorsInfos({ instructor }: { instructor: Tables<"instructors"> }) {
  const { data: courses, isLoading, error } = useInstructorCourses(instructor?.user_id || "");

  // Calculate average course rating
  const avgRating = (courses?.reduce((sum, course) => sum + (course.rating ?? 0), 0) ?? 0) / (courses?.length || 1);

  return (
    <div className='flex justify-between text-sm w-full'>
      <div className='flex items-center gap-1'>
        <span className="text-customText text-2xl text-center mt-[-3px]">★</span>
        <div>{avgRating?.toFixed(1) || 'N/A'}</div> {/* Display average rating */}
        <div className='text-gray-500'>Course rating</div>
      </div>
      <div className="flex items-center gap-1">
        <Image src="/Users.png" alt='User' width={16} height={16} />
        <div>{instructor?.students}</div>
        <div className='text-gray-500'>Students</div>
      </div>
      <div className="flex items-center gap-1">
        <Image src="/PlayCircle.png" alt='Course' width={16} height={16} />
        <div>{courses?.length || 0}</div>
        <div className='text-gray-500'>Courses</div>
      </div>
    </div>
  );
}
