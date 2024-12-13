"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLabelcolors } from "@/queries/useLabelcolors";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import { useUser } from "@/queries/useUser";
import Link from "next/link";
import { useAddToCart } from "@/hooks/purchases/cart/addToCartMutation";

interface CardProps {
  course: Tables<"courses">;
  width: string;
}

const Card: React.FC<CardProps> = ({ course, width }) => {
  const { data: labelColors, isLoading, isError } = useLabelcolors();
  const { data: intructordata } = useUser(course?.user_id);
  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      course_id: course.id,
      price: price,
      instructor_id: course.user_id,
    });
  };

  const price = (course?.price ?? 0) - (course?.discount ?? 0);
  const percentage = ((course?.discount ?? 0) / (course?.price ?? 0)) * 100;
  const [tooltipPosition, setTooltipPosition] = useState<"left" | "right">(
    "right"
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHover = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const spaceOnRight = window.innerWidth - rect.right;
        const spaceOnLeft = rect.left;

        // Set position based on available space
        if (spaceOnRight < 500 && spaceOnLeft > 500) {
          setTooltipPosition("left");
        } else {
          setTooltipPosition("right");
        }
      }
    };

    const cardElement = cardRef.current;
    cardElement?.addEventListener("mouseenter", handleHover);

    return () => {
      cardElement?.removeEventListener("mouseenter", handleHover);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading label colors</div>;

  const labelColorData = labelColors?.find(
    (labelColor) => labelColor.id == course.label
  );

  const labelColor = labelColorData?.colors || "";
  const labelText = labelColorData?.label || "";

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col ${width} gap-3  h-[20rem] border-2 border-gray-200`}
    >
      <Image
        src={course.pic ?? ""}
        alt="Course"
        width={200}
        height={200}
        className="w-full max-h-[12rem]"
      />
      <div className="flex flex-row items-center px-2 justify-between w-full ">
        <div className={`text-xs px-2 py-1 ${labelColor}`}>{labelText}</div>
        <h1 className="text-semibold text-customText">${price}</h1>
      </div>
      <div className="text-sm px-2 font-semibold text-gray-900 line-clamp-2">
        {course.title}
      </div>
      <div className="flex flex-row items-center justify-between w-full border-t-2 py-2 border-gray-200 mt-auto px-2">
        <h1 className="flex items-center ">
          <span className="text-customText text-2xl text-center mt-[-3px]">
            ★
          </span>
          <div>{Math.round((course?.rating ?? 0) * 10) / 10}</div>
        </h1>
        <h1 className="text-gray-700">
          {course.students} <span className="text-gray-400">Students</span>
        </h1>
      </div>
      <div
        className={`absolute top-0 ${
          tooltipPosition === "right" ? "left-full" : "right-full"
        } group-hover:block hidden w-[20rem] py-3 bg-white shadow-sm shadow-lg z-10`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${
            tooltipPosition === "right" ? "-left-4" : "-right-4"
          }`}
        >
          <div
            className={`relative w-0 h-0 ${
              tooltipPosition === "right"
                ? "border-r-[16px] border-r-white border-y-[10px] border-y-transparent border-l-0"
                : "border-l-[16px] border-l-white border-y-[10px] border-y-transparent border-r-0"
            }`}
          >
            {/* Add a pseudo-element for the shadow */}
            <div
              className={`absolute w-0 h-0 -z-10 ${
                tooltipPosition === "right"
                  ? "border-r-[16px] border-r-gray-300 border-y-[10px] border-y-transparent border-l-0"
                  : "border-l-[16px] border-l-gray-300 border-y-[10px] border-y-transparent border-r-0"
              }`}
              style={{
                top: "2px", // Position the shadow slightly lower
                left: tooltipPosition === "right" ? "-2px" : undefined,
                right: tooltipPosition === "left" ? "-2px" : undefined,
                filter: "blur(2px)", // Apply blur to create shadow effect
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between px-3">
            <div className={`text-xs px-2 py-1 ${labelColor}`}>{labelText}</div>
          </div>
          <div className="text-base font-semibold text-gray-900 px-3">
            {course.title}
          </div>
          <div className="flex justify-between items-center px-3">
            <div className="flex flex-row items-center gap-1 text-sm">
              <div className="relative h-10 w-10">
                <Image
                  src={intructordata?.pic || "/noAvatar.jpg"}
                  alt="Owner"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col text-xs">
                <div className="text-gray-500">Course By</div>
                {intructordata?.username}
              </div>
            </div>
            <div>
              <span className="text-customText">★</span>
              {Math.round((course?.rating ?? 0) * 10) / 10}{" "}
              <span className="text-sm text-gray-500">
                ({course?.numberOfRatings})
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center px-3">
            <div className="flex gap-1 items-center text-gray-700">
              <Image
                src="/Features/user.png"
                alt="User"
                width={16}
                height={16}
              />
              {course.students}
              <span className="text-xs text-gray-400">students</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-700">
              <Image
                src="/Features/bar-chart.png"
                alt="Level"
                width={16}
                height={16}
              />
              {course.level}
            </div>
            <div className="flex gap-1 items-center text-xs text-gray-700">
              <Image
                src="/Features/Clock.png"
                alt="Time"
                width={16}
                height={16}
              />
              {course.duration} hours
            </div>
          </div>
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
          <div className="text-xs px-3">WHAT YOU WILL LEARN</div>
          <div className="px-3">
            {course?.subjects && course.subjects.length > 0 ? (
              course.subjects.map((subject) => (
                <div
                  className="flex gap-1 items-center text-xs text-gray-500"
                  key={subject}
                >
                  <Image src="/Check.png" alt="Book" width={16} height={16} />
                  {subject}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500">No subjects available</div>
            )}
          </div>
          <div className="border-t-[1px] border-gray-200"></div>
          <div className="flex flex-col gap-2 px-3">
            <button
              onClick={handleAddToCart}
              className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50 text-sm py-2 px-2"
            >
              <div className="flex justify-center gap-2">
                <Image
                  src="/ShoppingCartSimple_white.png"
                  alt="Arrow Right"
                  width={20}
                  height={20}
                />
                <div>Add To Cart</div>
              </div>
            </button>
            <Link href={`/CourseDetails?courseId=${course.id}`}>
              <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 w-full py-2 px-4">
                Course Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
