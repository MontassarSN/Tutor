import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function HomeHeader() {
  return (
    <div className="flex flex-row w-full justify-end gap-10 items-center bg-gray-100">
      <div className="flex flex-col w-1/4 gap-7">
        <h1 className="text-4xl text-gray-900 font-bold">
          Learn with experts anytime, anywhere
        </h1>
        <div>
          Our mission is to help people find the best courses online and learn
          with experts anytime, anywhere.
        </div>
        <Link href="/CreateAccount">
          <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-2 px-4">
            Create an Account
          </button>
        </Link>
      </div>
      <div className="relative h-96 w-1/2">
        <Image
          src="/homeheader.jpg"
          alt="Home Header"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
