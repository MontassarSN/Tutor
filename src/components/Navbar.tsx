"use client";
import React from "react";
import { useSearch } from "../Contexts/SearchContext";
import Image from "next/image";
import Link from "next/link";
import useCurrentUser from "@/queries/useCurrentUser";
import DarkMode from "./DarkMode";
import Upnav from "./Upnav";
import { DropdownMenuDemo } from "./ProfileMenu";
import useCart from "@/hooks/purchases/cart/useCart";
import { Badge } from "./ui/badge";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { data, error } = useCurrentUser();
  const { data: cart } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();

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
            <Image
              src="/MagnifyingGlass.Png"
              alt="aaa"
              width={20}
              height={20}
            />

            <input
              type="text"
              placeholder="What do you want to learn"
              className="w-96 p-3 hover:border-none focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <Link href="/cart" className="relative">
            <Image
              src="/ShoppingCartSimple.png"
              alt="Shopping Cart"
              width={50}
              height={50}
              className="h-auto w-auto cursor-pointer"
            />
            {cart && cart.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0"
              >
                {cart.length}
              </Badge>
            )}
          </Link>
          {data ? (
            <DropdownMenuDemo />
          ) : (
            <>
              <Link href="/CreateAccount">
                <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-2 px-4">
                  Create an Account
                </button>
              </Link>
              <Link href="/SignIn">
                <button className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4">
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
