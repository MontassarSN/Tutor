"use client" ;

import React from 'react';
import ResearchForCourses from '@/components/ResearchForCourses';
import { SearchProvider, useSearch } from '@/Contexts/SearchContext';
const CoursesContent: React.FC = () => {
    const { searchQuery } = useSearch();
    return (
        <div className='bg-white text-black'>
          <ResearchForCourses />
        </div> );
};
export default function Page() {
    return (
      <SearchProvider>
        <CoursesContent />
      </SearchProvider>
    );
  }
