"use client";
import { UpdateCourseStep1 } from "@/api/course/updateCourseStep1";
import { useToast } from "@/components/ui/use-toast";
import { useCourseData } from "@/queries/useCourse";
import { useInstructors } from "@/queries/useInstructors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import validateZodShema from "helpers/zodValidation";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tables } from "@/types/database.types";
import useCurrentUser from "@/queries/useCurrentUser";

export default function PublishCourse({
  setValidsCount4,
}: {
  setValidsCount4: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { data: courseData } = useCourseData(courseId);
  const { data: instructors } = useInstructors();
  const { data: user } = useCurrentUser();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const courseSchema = z.object({
    welcomemessage: z.string().min(1).max(200),
    congratsmessage: z.string().min(1).max(200),
  });
  type courseSchemaType = z.infer<typeof courseSchema>;

  const [selectedInstructors, setSelectedInstructors] = useState<
  Array<Tables<"instructors"> & { users: Tables<"users"> | null }>
>([]);


  const [selectedInstructorsIds, setSelectedInstructorsIds] = useState<
    string[]
  >(courseData?.instructor_ids || (user?.user_id ? [user.user_id] : []));
  const filteredInstructors = instructors?.data?.filter(
    (instructor) =>
      instructor.users?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !selectedInstructorsIds.includes(instructor.user_id)
  );

  const [errors, setErrors] = useState<
    Partial<{
      [K in keyof courseSchemaType]: { _errors: courseSchemaType[K][] };
    }>
  >();
  useEffect(() => {
    if (instructors?.data) {
      const selected = instructors?.data.filter((instructor) =>
        selectedInstructorsIds.includes(instructor.user_id)
      );
      setSelectedInstructors(selected);
    }
  }, [selectedInstructorsIds]);

  const handleInstructorSelection = (id: string) => {
    setSelectedInstructorsIds((prev) => [...prev, id]);
    setSearchTerm(""); // Clear search after selection
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = (id: string) => {
    setSelectedInstructorsIds((prev) =>
      prev.filter((instructorId) => instructorId !== id)
    );
  };

  const updateCourseMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const welcomemessage = String(formData.get("welcomemessage"));
      const congratsmessage = String(formData.get("congratsmessage"));
      const { errors } = validateZodShema(formData, courseSchema);

      if (errors) {
        setErrors(errors);
        const errorMessages = Object.values(errors).flat();
        const numberOfErrors = errorMessages.length;
        setValidsCount4(3 - numberOfErrors);
        throw new Error(errorMessages.join(", "));
      }
      if (courseId) {
        await UpdateCourseStep1(
          {
            welcomemessage,
            congratsmessage,
            instructor_ids: selectedInstructorsIds, // Pass selected instructor IDs
          },
          courseId
        );
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Updating Course successfully",
        description: "Your course creation completed successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["courses", courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["courses", "active"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Adding Course",
        description: "Check your network connection",
      });
      console.error("Error adding course:", error.message);
    },
  });

  return (
    <form
      className="py-5 px-10 flex flex-col gap-5 w-[60rem]"
      action={updateCourseMutation.mutate}
    >
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">Publish Course</div>
        <div className="flex gap-2">
          <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4">
            Save
          </button>
          <button className="text-customText font-semibold py-2 px-4">
            Save Preview
          </button>
        </div>
      </div>
      <div className="font-semibold">Message</div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 w-[50%]">
          <div className="text-xs font-semibold">Welcome Message</div>
          <textarea
            className="border-2 border-gray-300 p-2 w-full h-[8rem] focus:outline-none"
            placeholder="Enter course starting message here..."
            name="welcomemessage"
            defaultValue={courseData?.welcomemessage || ""}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 w-[50%]">
          <div className="text-xs font-semibold">Congratulations Message</div>
          <textarea
            className="border-2 border-gray-300 p-2 w-full h-[8rem] focus:outline-none"
            placeholder="Enter your course completed message here..."
            name="congratsmessage"
            defaultValue={courseData?.congratsmessage || ""}
          ></textarea>
        </div>
      </div>
      <div className="font-semibold">Add Instructor</div>

      <div className="flex flex-col ">
        <div className="flex flex-row gap-1 items-center bg-gray-50 border-gray-200 border-2 px-2 w-[50%]">
          <Image
            src="/MagnifyingGlass.Png"
            alt="Search"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="p-1 hover:border-none focus:outline-none bg-gray-50 w-[10rem]"
          />
        </div>
        {searchTerm ? (
          filteredInstructors?.map((instructor) => (
            <div
              key={instructor.user_id}
              className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleInstructorSelection(instructor.user_id)}
            >
              <Image
                src={instructor.users?.pic ?? "/noAvatar.jpg"}
                alt="Instructor Pic"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <div className="font-semibold">
                  {instructor.users?.username}
                </div>
                <div className="text-gray-500">{instructor.title}</div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>

      <div className="font-semibold mt-4">Selected Instructors</div>
      <div className="flex flex-wrap gap-2">
        {selectedInstructors.map((instructor) => (
          <div
            key={instructor.user_id}
            className="flex items-center justify-between w-[20rem] bg-gray-100 p-2"
          >
            <div className="flex gap-2">
              <Image
                src={instructor.users?.pic || "/noAvatar.jpg"}
                alt="Instructor Pic"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col gap-1 text-sm">
                <div className="font-semibold">{instructor.users?.username}</div>
                <div className="text-gray-500">{instructor.title}</div>
              </div>
            </div>
            <Image
              className="cursor-pointer"
              src="/X.png"
              alt="Remove Instructor"
              width={20}
              height={20}
              onClick={() => handleDelete(instructor.user_id)}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex gap-5 justify-end">
        <button
          type="submit"
          className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 font-semibold py-2 px-4"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
