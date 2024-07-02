"use client" ;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResearchForCourses from '../components/ResearchForCourses';
import { SearchProvider, useSearch } from '../components/SearchContext';
const BecomeAnInstructorContent: React.FC = () => {
    const { searchQuery } = useSearch();
    return (
        <div className='bg-white text-black'>
          <Navbar />
          {searchQuery ? <ResearchForCourses /> : <div> BecomeAnInstructor </div>}
          <Footer />
        </div> );
};
function BecomeAnInstructor() {
    return (
      <SearchProvider>
        <BecomeAnInstructorContent />
      </SearchProvider>
    );
  }
export default BecomeAnInstructor;
