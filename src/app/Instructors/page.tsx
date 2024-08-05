"use client";

import React from 'react';
import Navbar from '../../components/Upnav';
import Footer from '../../components/Footer';
import { useInstructors } from '@/queries/useInstructors';
import { SearchProvider, useSearch } from '../../Contexts/SearchContext';
import InstructorCard from '@/components/InstructorCard';
import { Tables } from '@/types/database.types';

const InstructorsContent: React.FC = () => {
  const { data: instructors , error} = useInstructors();
  return (
    <div className='bg-white text-black'>
      <Navbar />
      <div className="flex flex-row justify-start w-full flex-wrap gap-5 px-40 py-10">
        {instructors?.data?.map((instructor: Tables<"instructors">, index: number) => (
          <InstructorCard key={index} instructor={instructor} width="w-[18%]" />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default function Page() {
  return (
    <SearchProvider>
      <InstructorsContent />
    </SearchProvider>
  );
}
