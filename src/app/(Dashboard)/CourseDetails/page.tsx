"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useCourseData } from "@/queries/useCourse";
import { useUser } from "@/queries/useUser";
import Image from "next/image";
import BuyCard from "./components/buyCard";
import Subjects from "./components/subjects";
import Audience from "./components/audience";
import Requirements from "./components/requirements";
import Comments from "./components/comments";
import useRealTime from "@/hooks/useRealTime";
import { useQueryClient } from "@tanstack/react-query";
import CourseRatings from "./components/courseRatings";
import StarsRatingStatic from "@/components/starsRatingStatic";
import Instructors from "./components/instructors";

export default function Page() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const queryClient = useQueryClient();

  const { data: course } = useCourseData(courseId);
  const { data: intructordata } = useUser(course?.user_id);
  useRealTime({
    tableName: "comments",
    event: "*",
    filters: [
      {
        column: "course_id",
        value: courseId as string,
      },
    ],
    onReceive: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", courseId] });
    },
  });

  return (
    <div className="flex  m-auto w-[60rem] gap-5 py-5">
      <div className="flex flex-col gap-5 w-[40rem] px-3 ">
        <div className="text-3xl font-semibold text-gray-900 ">
          {" "}
          {course?.title}
        </div>
        <div className="text-sm text-gray-500">{course?.subtitle}</div>
        <div className=" flex justify-between items-center ">
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
            <div className="flex flex-col text-xs font-semibold">
              <div className=" text-gray-500 font-normal">Course By</div>
              {intructordata?.username}
            </div>
          </div>
          <div className="text-sm font-semibold flex gap-1 items-center">
          <StarsRatingStatic rating={course?.rating as number} size="text-xl" />
             {Math.round((course?.rating ?? 0) * 10) / 10}{" "}
            <span className="text-xs text-gray-500 font-normal">
              ({course?.numberOfRatings} Ratings)
            </span>
          </div>
        </div>
        {course?.trailer ? (
          <video controls className="w-full h-[20rem] rounded-lg">
            <source src={course.trailer} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-sm text-gray-500">No trailer available.</p>
        )}
        <ul className="flex flex-row justify-between px-5 text-gray-700 text-sm">
          <li>Overview</li>
          <li>Curriculum</li>
          <li>Instructor</li>
          <li>Review</li>
        </ul>

        <div className="text-xl font-bold text-gray-900 ">Description</div>
        <div className="text-xs text-gray-500 ">{course?.description}</div>
        <Subjects subjects={course?.subjects} />
        <Audience audience={course?.audience} />
        <Requirements requirements={course?.requirements} />
        <Instructors instructorsIds={course?.instructor_ids as string[]} />
        <CourseRatings id={course?.id as string } />
        <Comments id={course?.id  as string} />
      </div>
      <BuyCard course={course} />
    </div>
  );
}
