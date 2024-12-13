"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const Pathname = usePathname();

  return (
    <div className="flex flex-col w-[17rem] bg-gray-900">
      <Link href="/">
        <div className="flex flex-row items-center gap-1 p-4 cursor-pointer">
          <Image
            src="/socials/GraduationCap.png"
            alt="Graduation Cap"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-semibold text-white">E-Tutor</h1>
        </div>
      </Link>

      <div className="border-t-[1px] border-gray-500"></div>
      <ul className="py-6">
        <li>
          <Link href="/instructor_dashboard">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/instructor_dashboard")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/instructor_dashboard")
                    ? "/instructor_sidebar/ChartBar_white.png"
                    : "/instructor_sidebar/ChartBar.png"
                }
                alt="Dashboard"
                width={30}
                height={30}
              />
              <span className="text-lg">Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/AddCourse">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/AddCourse")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/AddCourse")
                    ? "/instructor_sidebar/PlusCircle_white.png"
                    : "/instructor_sidebar/PlusCircle.png"
                }
                alt="Create New Course"
                width={30}
                height={30}
              />
              <span className="text-lg">Create New Course</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/Instructor_courses">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/Instructor_courses")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/Instructor_courses")
                    ? "/instructor_sidebar/Stack_white.png"
                    : "/instructor_sidebar/Stack.png"
                }
                alt="My Courses"
                width={30}
                height={30}
              />
              <span className="text-lg">My Courses</span>
            </div>
          </Link>
        </li>
        {/*/<li>
  <Link href="/Messages">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/Messages")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/Messages")
                    ? "/instructor_sidebar/ChatCircleDots_white.png"
                    : "/instructor_sidebar/ChatCircleDots.png"
                }
                alt="Messages"
                width={30}
                height={30}
              />
              <span className="text-lg">Messages</span>
            </div>
          </Link>
        </li> */}

        <li>
          <Link href="/Settings">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/Settings")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/Settings")
                    ? "/instructor_sidebar/Gear_white.png"
                    : "/instructor_sidebar/Gear.png"
                }
                alt="Settings"
                width={30}
                height={30}
              />
              <span className="text-lg">Settings</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
