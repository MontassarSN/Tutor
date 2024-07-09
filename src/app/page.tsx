"use client";
import React from "react";
import Home from "./Home/page";
import ResearchForCourses from "../components/ResearchForCourses";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchProvider } from "../components/SearchContext"; // Assuming SearchProvider is correctly imported

function AppContent() {
  // Assuming useSearch is correctly imported and used here
  // const { searchQuery } = useSearch();

  // For demonstration purposes, replacing useSearch with a placeholder
  const searchQuery = false;

  return (
    <div className="bg-white text-black">
      <Navbar />
      {searchQuery ? <ResearchForCourses /> : <Home />}
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}
