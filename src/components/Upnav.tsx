"use client";
import React, { useState } from 'react';
import { SheetDemo } from "./Sidebar";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Upnav() {
  const Pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 items-center w-full bg-gray-900 px-6">
      <SheetDemo />
      <div className="h-13 flex flex-row justify-between items-center w-full">
        <ul className="flex flex-row max-sm:hidden">
        <Link href="/">
          <li  
            className="p-6 text-gray-500 text-sm flex flex-col gap-1">
           Home
            <div className={` bg-orange-500 h-0.5 transition-all duration-300  ${Pathname.includes("/Home") ? " w-full" : "w-0"}`}></div>

          </li>
          </Link>
          <Link href="/Courses">
          <li 
            className="p-6 text-gray-500 text-sm flex flex-col gap-1"
          >
            Courses
            <div className={` bg-orange-500 h-0.5 transition-all duration-300  ${Pathname.includes("/Courses") ? " w-full" : "w-0"}`}></div>

          </li>
          </Link>
          <Link href="/About">
          <li 
            className="p-6 text-gray-500 text-sm flex flex-col gap-1"
          >
           About
            <div className={` bg-orange-500 h-0.5 transition-all duration-300  ${Pathname.includes("/About") ? " w-full" : "w-0"}`}></div>

          </li>
          </Link>
          <Link href="/Contact">
          <li 
            className="p-6 text-gray-500 text-sm flex flex-col gap-1"
          >
           Contact
            <div className={` bg-orange-500 h-0.5 transition-all duration-300  ${Pathname.includes("/Contact") ? " w-full" : "w-0"}`}></div>

          </li>
          </Link>
          <Link href="/BecomeAnInstructor">
          <li 
            className="p-6 text-gray-500 text-sm flex flex-col gap-1"
          >
           Become An Instructor
            <div className={` bg-orange-500 h-0.5 transition-all duration-300  ${Pathname.includes("/BecomeAnInstructor") ? " w-full" : "w-0"}`}></div>

          </li>
          </Link>
        </ul>
        <ul className="mx-5 space-x-4">
          <select className="bg-inherit text-gray-500 outline-none focus:border-none">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
          <select className="bg-inherit text-gray-500 outline-none focus:border-none">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </ul>
      </div>
    </nav>
  );
}
