import Image from "next/image";
import React from "react";
import Includes from "./includes";
import Share from "./share";
import { Tables } from "@/types/database.types";

type BuyCardProps = {
  course: Tables<"courses"> | null | undefined; // Accept course as a single prop
};

export default function BuyCard({ course }: BuyCardProps) {
  const price = (course?.price ?? 0) - (course?.discount ?? 0);
  const percentage = ((course?.discount ?? 0) / (course?.price ?? 0)) * 100;
  return (
    <div className="flex flex-col gap-5 w-[20rem] bg-white shadow-sm shadow-lg border border-gray-300 py-2 h-[52rem]">
      {course?.discount ? (
        <div className="flex justify-between items-center px-3">
          <div className="flex gap-1 items-center">
            <span className="text-xl">${price}</span>
            <span className="text-sm text-gray-500 line-through">
              ${course?.price}
            </span>
          </div>
          <span className="bg-customBg text-customText p-1 text-xs">
            {percentage}% OFF
          </span>
        </div>
      ) : (
        <span className="text-xl px-3">${price}</span>
      )}

      <div className="border-t-[1px] border-gray-200"></div>
      <div className="flex flex-col gap-2 px-3">
        <div className="flex justify-between items-center text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <Image
              src="/course_details/Clock.png"
              width={20}
              height={20}
              alt="Clock"
            />
            <div>Course Duration</div>
          </div>
          <div className="text-gray-500">{course?.duration} hours</div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <Image
              src="/course_details/bar-chart.png"
              width={20}
              height={20}
              alt="Clock"
            />
            <div>Course Level</div>
          </div>
          <div className="text-gray-500">{course?.level}</div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <Image
              src="/course_details/Users.png"
              width={20}
              height={20}
              alt="Clock"
            />
            <div>Students Enrolled</div>
          </div>
          <div className="text-gray-500">{course?.students}</div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <Image
              src="/course_details/Notebook.png"
              width={20}
              height={20}
              alt="Clock"
            />
            <div>Language</div>
          </div>
          <div className="text-gray-500">{course?.language}</div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-900">
          <div className="flex items-center gap-2">
            <Image
              src="/course_details/Notepad.png"
              width={20}
              height={20}
              alt="Clock"
            />
            <div>Subtittle Language</div>
          </div>
          <div className="text-gray-500">{course?.subtitle_language}</div>
        </div>
      </div>
      <div className="border-t-[1px] border-gray-200"></div>
      <div className="flex flex-col gap-2 px-3">
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  text-sm py-2 px-2"
          type="submit"
        >
          <div className="flex flex-row justify-center gap-2">
            <Image
              src="/ShoppingCartSimple_white.png"
              alt="Arrow Right"
              width={20}
              height={20}
            />
            <div>Add To Cart</div>
          </div>
        </button>

        <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 w-full py-2 px-4">
          Buy Now
        </button>
      </div>
      <div className="flex justify-between px-3">
        <button className="px-4 py-2 w-[48%] text-sm font-semibold border border-1 text-gray-700  disabled:opacity-50">
          Add to wishlist
        </button>
        <button className="px-4 py-2 w-[48%] text-sm text-gray-700 font-semibold border border-1 disabled:opacity-50">
          Gift Course
        </button>
      </div>
      <div className="text-xs text-gray-500 px-3">
        <span className="text-gray-700">Note:</span> all course have 30-days
        money-back guarantee
      </div>
      <div className="border-t-[1px] border-gray-200"></div>
      <Includes />
      <div className="border-t-[1px] border-gray-200"></div>
      <Share />
    </div>
  );
}
