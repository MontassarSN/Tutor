"use client" ;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResearchForCourses from '../components/ResearchForCourses';
import { SearchProvider, useSearch } from '../components/SearchContext';
const AboutContent: React.FC = () => {
    const { searchQuery } = useSearch();
    return (
        <div className='bg-white text-black'>
          <Navbar />
          {searchQuery ? <ResearchForCourses /> : <div> About </div>}
          <Footer />
        </div> );
};
function About() {
    return (
      <SearchProvider>
        <AboutContent />
      </SearchProvider>
    );
  }
export default About;
