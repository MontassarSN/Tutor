"use client";
import useCurrentUser from "@/queries/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavList from "./navList";
import { useInstructor } from "@/queries/useInstrcutor";

export default function Navbar() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { data: intructordata } = useInstructor(user?.user_id ?? "");

  return (
    <div className="flex flex-col m-auto bg-white shadow-sm mt-[-10rem] w-[60rem]">
      <div className="flex justify-between items-center p-10">
        <div className=" flex items-center gap-3 ">
          <Image
            src={user?.pic || "/noAvatar.jpg"}
            width={100}
            height={100}
            className="rounded-full min-w-[5rem] max-w-[5rem] min-h-[5rem] max-h-[5rem] "
            alt="Profile Picture"
          />
          <div className="text-base font-semibold">
            <div>{user?.username}</div>
            <span className="text-gray-500  text-xs">{user?.email}</span>
          </div>
        </div>
        {intructordata ? (
          <Link href="/Settings">
            <button className="flex gap-1 bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-2 px-4 items-center">
              {" "}
              Instructor Dashboard{" "}
              <Image
                src="/ArrowRightOrange.png"
                alt="aaa"
                height={15}
                width={15}
              />
            </button>
          </Link>
        ) : (
          <Link href="/BecomeAnInstructor">
            <button className="flex gap-1 bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-2 px-4 items-center">
              Become Instructor{" "}
              <Image
                src="/ArrowRightOrange.png"
                alt="aaa"
                height={15}
                width={15}
              />
            </button>
          </Link>
        )}
      </div>
      <NavList />
    </div>
  );
}
