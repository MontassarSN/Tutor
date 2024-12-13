import React from "react";
import Image from "next/image";
import { useUsers } from "@/queries/useUsers";
import { Tables } from "@/types/database.types";

interface CardProps {
  instructor: Tables<"instructors">;
  width: string; // Example: "w-[23%]", passed as a Tailwind CSS class
}

const InstructorCard: React.FC<CardProps> = ({ instructor, width }) => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  // Find the user corresponding to the instructor
  const user = users?.find((user) => user.user_id === instructor.user_id);

  if (!user) return <div>User not found</div>;

  return (
    <div
      className={`flex flex-col rounded-md ${width} gap-2 items-center bg-white shadow-sm border-2 border-gray-200`}
    >
      <Image
        src={user.pic || "/noAvatar.jpg"} // Use user pic from users table
        alt="Instructor"
        width={500}
        height={500}
        className="w-auto h-auto rounded-md"
      />
      <div className="text-sm font-semibold">{user.username}</div>{" "}
      {/* Use user name from users table */}
      <div className="text-xs text-gray-500">{instructor.title}</div>
      <div className="flex flex-row items-center justify-between w-full border-t-2 py-2 px-2 border-gray-200 mt-auto">
        <h1 className="flex items-center">
          <span className="text-customText text-2xl text-center mt-[-3px] gap-1">
            ★
          </span>
          {instructor.rating ?? 0}
        </h1>
        <h1 className="text-gray-700 text-sm">
          {instructor.students}{" "}
          <span className="text-xs text-gray-400">Students</span>
        </h1>
      </div>
    </div>
  );
};

export default InstructorCard;
