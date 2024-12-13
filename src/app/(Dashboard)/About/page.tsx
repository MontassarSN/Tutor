"use client";

import React from "react";
import ResearchForCourses from "@/components/ResearchForCourses";
import { SearchProvider, useSearch } from "@/Contexts/SearchContext";
import Companies from "@/components/Companies";

export default function Page() {
  const { searchQuery } = useSearch();
  return (
    <div className="bg-white shadow-sm text-black">
      {searchQuery ? (
        <ResearchForCourses />
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between px-44 py-10 items-center">
            <div className="flex flex-col gap-3  w-96">
              <div className="text-6xl text-gray-100 font-bold">2007-2021</div>
              <div className="text-4xl font-semibold">
                We share knowledge with the world
              </div>
              <div className="text-sm text-gray-500">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Praesent fermentum quam mauris. Fusce tempor et augue a aliquet.
                Donec non ipsum non risus egestas tincidunt at vitae nulla.{" "}
              </div>
            </div>
            <div className="flex flex-row justify-between h-[31rem]">
              <img src="/About1.png" alt="About1" />
            </div>
          </div>
          <Companies />
          <div className="flex flex-row px-44 bg-customBg items-end">
            <img src="/About2.png" alt="About3" className="h-[27rem]" />
            <div className="flex flex-col gap-3  py-20">
              <div className="text-sm text-customText font-bold ">
                OUR ONE BILLION MISSION
              </div>
              <div className="text-3xl font-semibold">
                Our one billion mission sounds bold, We agree.
              </div>
              <div className="text-xs text-gray-500">
                "We cannot solve our problems with the same thinking we used
                when we created them."—Albert Einstein. Institutions are slow to
                change. Committees are where good ideas and innovative thinking
                go to die. Choose agility over dogma. Embrace and drive change.
                We need to wipe the slate clean and begin with bold, radical
                thinking.
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between py-10 pl-44 pr-10 items-center">
            <div className="flex flex-col gap-3  w-[20rem]">
              <div className="text-sm text-customText font-bold ">
                OUR GALLERY
              </div>
              <div className="text-3xl font-semibold">
                We’ve been here almost 17 years
              </div>
              <div className="text-xs text-gray-500">
                Fusce lobortis leo augue, sit amet tristique nisi commodo in.
                Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
                libero. Curabitur in urna ligula. torquent per conubia nostra.
              </div>
              <button className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  text-sm py-2 px-2 w-[9rem]">
                <div className="flex flex-row gap-2">
                  <div>Join our team</div>
                  <img
                    src="/ArrowRight.png"
                    alt="Arrow Right"
                    className="h-[20px] w-[20px]"
                  />
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-3 ">
              <div className="flex flex-row gap-3 items-end m-auto">
                <img
                  src="/About4.png"
                  alt="About1"
                  className="w-auto h-[12.5rem]"
                />
                <img
                  src="/About5.png"
                  alt="About1"
                  className="w-auto h-[14.5rem]"
                />
                <img
                  src="/About3.png"
                  alt="About1"
                  className="w-auto h-[10rem]"
                />
              </div>
              <div className="flex flex-row gap-3 items-start">
                <img
                  src="/About6.png"
                  alt="About1"
                  className="w-auto h-[16rem]"
                />
                <img
                  src="/About7.png"
                  alt="About1"
                  className="w-auto h-[19.5rem]"
                />
                <div className="flex flex-col gap-3 ">
                  <img
                    src="/About8.png"
                    alt="About1"
                    className="w-auto h-[10rem]"
                  />
                  <img
                    src="/About9.png"
                    alt="About1"
                    className="w-[8.2rem] h-[8rem]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between px-44 py-10">
            <div className="flex flex-col gap-5 w-[21rem]">
              <div className="flex flex-col gap-3  bg-gray-50 px-5 py-3 ">
                <div className="flex flex-row justify-between">
                  <img src="/double_quotes1.png" />
                  <div></div>
                </div>
                <div className="text-sm text-center">
                  Eduguard fit us like a glove. Their team curates fresh,
                  up-to-date courses from their marketplace and makes them
                  available to customers.
                </div>
                <div className="flex flex-row justify-between">
                  <div></div>
                  <img src="/double_quotes2.png" />
                </div>
              </div>
              <div className="m-auto flex flex-col gap-3 text-center">
                <div className="text-sm font-semibold">Sundar Pichai</div>
                <div className="text-xs text-gray-500">
                  Chief Chairman of{" "}
                  <span className="text-blue-600 font-semibold">Google</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-[21rem]">
              <div className="flex flex-col gap-3 bg-gray-50 px-5 py-3 ">
                <div className="flex flex-row justify-between">
                  <img src="/double_quotes1.png" />
                  <div></div>
                </div>
                <div className="text-sm text-center">
                  Edugaurd responds to the needs of the business in an agile and
                  global manner. It’s truly the best solution for our employees
                  and their careers.
                </div>
                <div className="flex flex-row justify-between">
                  <div></div>
                  <img src="/double_quotes2.png" />
                </div>
              </div>
              <div className="m-auto flex flex-col gap-3 text-center">
                <div className="text-sm font-semibold">Satya Nadella</div>
                <div className="text-xs text-gray-500">
                  CEO of{" "}
                  <span className="text-blue-600 font-semibold">Microsoft</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-[21rem]">
              <div className="flex flex-col gap-3 bg-gray-50 px-5 py-3">
                <div className="flex flex-row justify-between">
                  <img src="/double_quotes1.png" />
                  <div></div>
                </div>
                <div className="text-sm text-center">
                  In total, it was a big success, I would get emails about what
                  a fantastic resource it was.
                </div>
                <div className="flex flex-row justify-between">
                  <div></div>
                  <img src="/double_quotes2.png" />
                </div>
              </div>
              <div className="m-auto flex flex-col gap-3 text-center">
                <div className="text-sm font-semibold">Ted Sarandos</div>
                <div className="text-xs text-gray-500">
                  Chief Executive Officer of{" "}
                  <span className="text-blue-600 font-semibold">Netflix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
