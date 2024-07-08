"use client" ;

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResearchForCourses from '../../components/ResearchForCourses';
import { SearchProvider, useSearch } from '../../components/SearchContext';
const CoursesContent: React.FC = () => {
    const { searchQuery } = useSearch();
    return (
        <div className='bg-white text-black'>
          <Navbar />
          <div className='py-10'>
          <ResearchForCourses />
          </div>

          <Footer />
        </div> );
};
export default function Page() {
    return (
      <SearchProvider>
        <CoursesContent />
      </SearchProvider>
    );
  }
