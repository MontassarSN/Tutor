"use client";
import React from "react";
import { useSearch } from "../Contexts/SearchContext";
import Image from "next/image";
import Link from "next/link";
import useCurrentUser from "@/queries/useCurrentUser";
import DarkMode from "./DarkMode";
import Upnav from "./Upnav";
import { DropdownMenuDemo } from "./ProfileMenu";

interface NavbarProps {
  // Add props here if needed
}

const Navbar: React.FC<NavbarProps> = () => {
  const { data, error } = useCurrentUser();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <Upnav />
      <div className="flex flex-row justify-between items-center px-6 py-4">
        <div className="flex flex-row justify-between items-center gap-5">
          <Link href="/">
            <div className="flex flex-row justify-between items-center gap-1">
              <div className="relative h-12 w-12">
                <Image
                  src="/GraduationCap.jpg"
                  alt="Graduation Cap"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h1 className="text-2xl font-bold">E-Tutor</h1>
            </div>
          </Link>
          <select className="w-28 flex justify-start p-3 border-gray-200 border-2">
            <option>Browse</option>
          </select>
          <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
            <div>🔍</div>
            <input
              type="text"
              placeholder="What do you want to learn"
              className="w-96 p-3 hover:border-none focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="relative h-6 w-6">
              <Image
                src="/Bell.png"
                alt="Bell"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative h-6 w-6">
              <Image
                src="/Heart.png"
                alt="Heart"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative h-6 w-6">
              <Image
                src="/ShoppingCartSimple.png"
                alt="Shopping Cart"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          {data ? (
            <DropdownMenuDemo />
          ) : (
            <>
              <Link href="/CreateAccount">
                <button className="bg-customBg text-customText py-2 px-4">
                  Create an Account
                </button>
              </Link>
              <Link href="/SignIn">
                <button className="bg-customText text-white py-2 px-4">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
