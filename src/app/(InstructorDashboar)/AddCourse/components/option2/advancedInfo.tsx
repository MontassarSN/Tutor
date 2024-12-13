"use client";
import React, { useState, useEffect } from "react";
import PicVidUpload from "./PicVidUpload";
import CourseSubjects from "./courseSubjects";
import CourseAudience from "./courseAudience";
import CourseRequirements from "./courseRequirements";
import { useOption } from "../../context/OptionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { updateCourseStep2 } from "@/api/course/updateCourseStep2";
import { useCourseData } from "@/queries/useCourse";
export default function AdvancedInfo({
  setValidsCount2,
  validsCount2,
}: {
  setValidsCount2: React.Dispatch<React.SetStateAction<number>>;
  validsCount2: number;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setSelectedOption } = useOption();

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const { data: courseData } = useCourseData(courseId);

  const [subjects, setSubjects] = useState<string[]>(Array(4).fill(""));
  const [audience, setAudience] = useState<string[]>(Array(4).fill(""));
  const [requirements, setRequirements] = useState<string[]>(Array(4).fill(""));
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(
    courseData?.pic || null
  );
  const [video, setVideo] = useState<string | ArrayBuffer | null>(
    courseData?.trailer || null
  );
  const [description, setDescription] = useState<string>(
    courseData?.description || ""
  );

  useEffect(() => {
    const countValidInputs = () => {
      let count = 0;

      if (thumbnail) count++;
      if (video) count++;
      if (description.trim()) count++;

      if (subjects.filter((subject) => subject.trim()).length >= 1) count++;
      if (audience.filter((item) => item.trim()).length >= 1) count++;
      if (requirements.filter((requirement) => requirement.trim()).length >= 1)
        count++;

      setValidsCount2(count);
    };

    countValidInputs();
  }, [
    thumbnail,
    video,
    description,
    subjects,
    audience,
    requirements,
    setValidsCount2,
  ]);

  const updateCourseMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (courseId && validsCount2 === 6) {
        await updateCourseStep2(
          formData,
          courseId,
          subjects,
          audience,
          requirements
        );
      } else {
        throw new Error("Fill all fields");
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Adding Changes Successfully",
        description:
          "Your course Advanced information is inserted successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["courses", courseId],
      });
      if (validsCount2 >= 6) setSelectedOption("option3");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error Adding to Course",
        description: "Fill All Fields",
      });
      console.error("Error adding course:", error.message);
    },
  });

  return (
    <div className="py-5 px-10 flex flex-col gap-5 w-[60rem]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          updateCourseMutation.mutate(formData);
        }}
        className="flex flex-col gap-5 w-full"
      >
        <PicVidUpload
          setThumbnail={setThumbnail}
          setVideo={setVideo}
          thumbnail={thumbnail}
          video={video}
        />
        <div className="text-sm font-semibold text-gray-900">
          Course Descriptions
        </div>
        <textarea
          name="description"
          className="w-full h-[10rem] border-gray-200 border-[2px] px-4 py-2 rounded-md outline-none focus:border-customText  transition-all duration-200 ease-linear"
          placeholder="Write a brief description of your course"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <CourseSubjects
          subjects={subjects}
          setSubjects={setSubjects}
          data={courseData}
        />
        <CourseAudience
          audience={audience}
          setAudience={setAudience}
          data={courseData}
        />
        <CourseRequirements
          requirements={requirements}
          setRequirements={setRequirements}
          data={courseData}
        />
        <div className="w-full flex justify-between">
          <button
            type="button"
            onClick={() => setSelectedOption("option1")}
            className="bg-gray-100 text-gray-600 py-2 px-3"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-4"
          >
            Save & next
          </button>
        </div>
      </form>
    </div>
  );
}
