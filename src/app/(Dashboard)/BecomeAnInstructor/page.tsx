"use client";

import React from "react";
import ResearchForCourses from "@/components/ResearchForCourses";
import { SearchProvider, useSearch } from "@/Contexts/SearchContext";
import SiteInfo from "./components/SiteInfo";
import WhyTeaching from "./components/WhyTeaching";
import Link from "next/link";
function PageContent() {
  const { searchQuery } = useSearch();
  return (
    <div className="bg-white shadow-sm text-black">
      {searchQuery ? (
        <ResearchForCourses />
      ) : (
        <div className="flex flex-col gap-5 py-10 ">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="w-[24rem] flex flex-col gap-5 ">
              <h1 className="text-4xl text-gray-900 font-bold">
                Become An Instructor
              </h1>
              <div className="text-sm text-gray-500">
                Become an instructor & start teaching with 26k certified
                instructors. Create a success story with 67.1k Students — Grow
                yourself with 71 countries.
              </div>
              <Link href="/InstructorForm">
                <button className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-3 px-4 w-[10rem]">
                  Get Started
                </button>
              </Link>
            </div>
            <img
              src="/BecomeAnInstructor/binstructor1.png"
              className="w-[30rem] h-auto"
            />
          </div>
          <SiteInfo />
          <WhyTeaching />
          <div className="flex flex-row justify-center gap-5">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-semibold">
                Instructor rules & regulations
              </h1>
              <div className="text-sm text-gray-500">
                Sed auctor, nisl non elementum ornare, turpis orci consequat
                arcu, at iaculis quam leo nec libero. Aenean mollis turpis
                velit, id laoreet sem luctus in. Etiam et egestas lorem.
              </div>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Page() {
  return (
    <SearchProvider>
      <PageContent />
    </SearchProvider>
  );
}
