"use client";

import StarsRatingStatic from "@/components/starsRatingStatic";
import { useUser } from "@/queries/useUser";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import React from "react";

// Utility function to format the time difference
const timeAgo = (created_at: string) => {
  const createdTime = new Date(created_at).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - createdTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};

export default function Comment({ comment }: { comment: Tables<"comments"> }) {
  const { data: user, error } = useUser(comment.user_id);

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error loading comment</div>;
  }

  return (
    <div className="flex items-start gap-2">
      <Image
        src={user?.pic || "/noAvatar.jpg"}
        alt={user?.username || "User Avatar"}
        width={40}
        height={40}
        className="rounded-full  min-h-[3rem] max-h-[3rem] min-w-[3rem] max-w-[3rem]"
      />
      <div className="flex flex-col ">
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-900 font-semibold">
            {user?.username || "Unknown User"}
          </div>
          <div className="text-xl font-bold text-gray-500   mt-[-10px]">.</div>
          <div className="text-xs text-gray-500">
            {timeAgo(comment.created_at)}
          </div>
        </div>
        <div>
        <StarsRatingStatic rating={comment?.rating as number} size="text-xl"/>
        </div>
        <div className="text-sm text-gray-700">{comment.content}</div>
      </div>
    </div>
  );
}
