import React from "react";
import { categories } from "@/db/Data";
import { Category } from "@/types/Types";
import Image from "next/image"; // Import next/image

export default function TopCat() {
  return (
    <div className="bg-white w-full py-7">
      <div className="flex flex-col gap-5 w-2/3 m-auto items-center justify-center">
        <h1 className="text-3xl font-semibold align-middle py-10">
          Top Categories
        </h1>
        <div className="flex flex-row justify-center w-full flex-wrap gap-5">
          {categories.map((cat: Category, index: number) => (
            <div
              key={index}
              className={`flex flex-row w-56 gap-2 items-center px-2 h-20 ${cat.color}`}
            >
              <div className="bg-white p-2 flex justify-center items-center">
                <Image
                  src={cat.pic}
                  alt={cat.text}
                  width={28} // Set your preferred width (in pixels) for the image
                  height={28} // Set your preferred height (in pixels) for the image
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold">{cat.text}</div>
                <div className="text-xs">{cat.courses} courses</div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-5">
          We have more categories and subcategories
          <a className="text-customText pl-3">Browse All →</a>
        </div>
      </div>
    </div>
  );
}
