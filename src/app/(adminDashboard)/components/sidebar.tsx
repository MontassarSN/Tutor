"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignOut } from "@/api/auth/signOut";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const Pathname = usePathname();
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: async () => SignOut(),
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSignout = () => {
    signOutMutation.mutate();
  };

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
          <Link href="/admin_dashboard">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/admin_dashboard")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/admin_dashboard")
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
          <Link href="/instructors_approval">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/instructors_approval")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/instructors_approval")
                    ? "/instructor_sidebar/PlusCircle_white.png"
                    : "/instructor_sidebar/PlusCircle.png"
                }
                alt="Instructors Approval"
                width={30}
                height={30}
              />
              <span className="text-lg">Instructors Approval</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/add_admin">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/add_admin")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/add_admin")
                    ? "/instructor_sidebar/PlusCircle_white.png"
                    : "/instructor_sidebar/PlusCircle.png"
                }
                alt="Instructors Approval"
                width={30}
                height={30}
              />
              <span className="text-lg">Add Admin</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin_settings">
            <div
              className={`px-4 flex gap-2 items-center py-3 cursor-pointer ${
                Pathname.includes("/admin_settings")
                  ? "bg-customText text-white hover:bg-hoverbutton hover:text-gray-50"
                  : "text-gray-500"
              }`}
            >
              <Image
                src={
                  Pathname.includes("/admin_settings")
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
        <li onClick={handleSignout}>
          <div
            className={`px-4 flex gap-2 items-center py-3 cursor-pointer text-gray-500`}
          >
            <LogOut size={30} />

            <span className="text-lg">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
