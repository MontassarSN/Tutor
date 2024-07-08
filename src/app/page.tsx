"use client" ;
import React from 'react';
import Home from './Home/page';
import ResearchForCourses from '../components/ResearchForCourses';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SearchProvider } from '../components/SearchContext'; // Assuming SearchProvider is correctly imported
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function AppContent() {
  // Assuming useSearch is correctly imported and used here
  // const { searchQuery } = useSearch();

  // For demonstration purposes, replacing useSearch with a placeholder
  const searchQuery = false;

  return (
    <div className='bg-white text-black'>
      <Navbar />
      {searchQuery ? <ResearchForCourses /> : <Home />}
      <Footer />
    </div>
  );
}

export default function Page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 , // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools /> 
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </QueryClientProvider>
  );
}


