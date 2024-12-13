"use client";
import useCurrentUser from "@/queries/useCurrentUser";
import { Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const { data: user, isLoading, error } = useCurrentUser();
  const Pathname = usePathname();

  const routeToTitleMap: Record<string, string> = {
    "/instructor_dashboard": "Dashboard",
    "/AddCourse": "Create New Course",
    "/Instructor_courses": "My Courses",
    "/Earnings": "Earnings",
    "/Messages": "Messages",
    "/Settings": "Settings",
  };

  const pageTitle = Object.keys(routeToTitleMap).find((route) =>
    Pathname.includes(route)
  )
    ? routeToTitleMap[Pathname]
    : "Welcome";

  return (
    <div className="flex py-4 justify-between top-0 w-[60rem]">
      <div className="flex flex-col gap-2">
        <div className="text-xs text-gray-500">Good Morning</div>
        <div className="text-lg text-black">{pageTitle}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-row gap-1 items-center bg-gray-50 border-gray-200 border-2 px-2">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="p-1 hover:border-none focus:outline-none bg-gray-50 w-[10rem]"
          />
        </div>
        <div className="p-2 bg-gray-50">
          <Image src="/Bell.png" alt="Notifications" width={20} height={20} />
        </div>
        <div className="relative h-[3rem] w-[3rem] cursor-pointer">
          <Image
            src={user?.pic || "/noAvatar.jpg"}
            fill
            alt="User Avatar"
            className="rounded-full border-2"
          />
        </div>
      </div>
    </div>
  );
}
