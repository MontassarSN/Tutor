import Link from 'next/link';
import React, { useState } from 'react'

export default function NavList() {
  const [selectedPage, setSelectedPage] = useState(7);

  return (
<ul className="flex justify-between px-10 py-2 border-l-0 border-r-0 border-customBg border">
  <Link href="/dashboard">
    <li onClick={() => setSelectedPage(1)} className="text-sm text-gray-700 cursor-pointer">
      Dashboard
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 1 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/purchasedCourses">
    <li onClick={() => setSelectedPage(2)} className="text-sm text-gray-700 cursor-pointer">
      Courses
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 2 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/teachers">
    <li onClick={() => setSelectedPage(3)} className="text-sm text-gray-700 cursor-pointer">
      Teachers
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 3 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/messages">
    <li onClick={() => setSelectedPage(4)} className="text-sm text-gray-700 cursor-pointer">
      Messages
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 4 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/wishlist">
    <li onClick={() => setSelectedPage(5)} className="text-sm text-gray-700 cursor-pointer">
      Wishlist
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 5 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/purchase_history">
    <li onClick={() => setSelectedPage(6)} className="text-sm text-gray-700 cursor-pointer">
      Purchase History
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 6 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>

  <Link href="/account_settings">
    <li onClick={() => setSelectedPage(7)} className="text-sm text-gray-700 cursor-pointer">
      Settings
      <div className={`bg-orange-500 h-0.5 transition-all duration-300 ${selectedPage === 7 ? "w-full" : "w-0"}`}></div>
    </li>
  </Link>
</ul>


  )
}
