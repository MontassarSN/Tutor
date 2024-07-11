"use client";
import React from "react";
import Home from "./Home/page";
import ResearchForCourses from "../components/ResearchForCourses";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchProvider , useSearch } from "../components/SearchContext"; // Assuming SearchProvider is correctly imported

function AppContent() {

  const { searchQuery } = useSearch();

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
