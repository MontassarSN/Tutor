"use client";
import React, { useEffect, useState } from "react";
import { useOption } from "../../context/OptionContext";
import { InsertCourseData } from "@/api/course/insertcoursedata";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useCourseData } from "@/queries/useCourse";
import { UpdateCourseStep1 } from "@/api/course/updateCourseStep1";
import { Tables, TablesUpdate } from "@/types/database.types";
import validateZodShema, { ZodError } from "helpers/zodValidation";
import Select from "./Select";
import useCurrentUser from "@/queries/useCurrentUser";
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "SubTitle is required"),
  label: z.string().min(1, "Course category is required"),
  sublabel: z.string().min(1, "Course sub-category is required"),
  topic: z.string().min(1, "Course topic is required"),
  language: z.string().min(1, "Course language is required"),
  sublanguage: z.string().min(1, "Course sublanguage is required"),
  level: z.string().min(1, "Course level is required"),
  duration: z.string().regex(/^\d+$/, "Duration must be a number").optional(),
});
type courseSchemaType = z.infer<typeof courseSchema>;
export default function BasicInfoForm({
  setValidsCount1,
}: {
  setValidsCount1: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setSelectedOption } = useOption();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {data:user}=useCurrentUser();
      const { toast } = useToast();
  const [Errors, setErrors] = useState<
    Partial<{
      [K in keyof courseSchemaType]: { _errors: courseSchemaType[K][] };
    }>
  >();
  const courseId = searchParams.get("courseId");
  const { data: courseData } = useCourseData(courseId);
  useEffect(() => {
    if (courseData) {
      setValidsCount1(9);
    }
  }, [courseData]);

  const addCourseMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = String(formData.get("title"));
      const subtitle = String(formData.get("subtitle"));
      const label = Number(formData.get("label"));
      const sublabel = Number(formData.get("sublabel"));
      const topic = String(formData.get("topic"));
      const language = String(formData.get("language"));
      const subtitle_language = String(formData.get("sublanguage"));
      const level = String(formData.get("level"));
      const duration = Number(formData.get("duration"));

      const { errors } = validateZodShema(formData, courseSchema);

      if (errors) {
        setErrors(errors);
        const errorMessages = Object.values(errors).flat();
        const numberOfErrors = errorMessages.length;
        setValidsCount1(9 - numberOfErrors);
        toast({
          variant: "destructive",
          title: "Error Adding Course",
          description: "Please fill the form correctly.",
        });
        throw new Error(errorMessages.join(", "));
      }
      setValidsCount1(9);
      if (!user) {
        throw new Error("User not found");
      }
      

      if (courseId) {
        await UpdateCourseStep1(
          {
            title,
            label,
            subtitle,
            sublabel,
            topic,
            language,
            subtitle_language,
            level,
            duration}
          ,courseId);
      }
      if (!courseId) {
        const newcourseid = await InsertCourseData({
          title,
          label,
          subtitle,
          sublabel,
          topic,
          language,
          subtitle_language,
          level,
          duration,
          user_id: user?.user_id,
        });
        return newcourseid;
      }
    },
    onSuccess: (newcourseid) => {
      toast({
        variant: "success",
        title: "Adding Course successfully",
        description: "Your course basic information is inserted successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["courses",courseId],
      });
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set('option',"option2");
      currentParams.set('courseId', courseId ? String(courseId) : String(newcourseid));
      router.push(`/AddCourse?${currentParams.toString()}`);
      setSelectedOption("option2");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Adding Course",
        description: "check your network connection",
      });
      console.error("Error adding course:", error.message);
    },
  });

  return (
    <div className="flex flex-col  gap-5">
      <form
        className="flex flex-col  gap-5"
        action={addCourseMutation.mutate} // Handle form submission
      >
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">Title</div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full focus:outline-none"
            type="text"
            placeholder="Your course title"
            name="title"
            defaultValue={courseData?.title || ""}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">Subtitle</div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full focus:outline-none"
            type="text"
            placeholder="Your course subtitle"
            name="subtitle"
            defaultValue={courseData?.subtitle || ""}
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 items-center gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-900">
              Course Category
            </div>
            <Select
              error={Errors?.label?._errors}
              name="label"
              defaultValue={String(courseData?.label)}
              options={[
                { value: "1", label: "Design" },
                { value: "2", label: "Developments" },
                { value: "3", label: "Business" },
                { value: "4", label: "Marketing" },
                { value: "5", label: "IT & Software" },
                { value: "6", label: "Music" },
                { value: "7", label: "Health & Fitness" },
                { value: "8", label: "Lifestyle" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-900">
              Course Sub-category
            </div>
            <Select
              name="sublabel"
              error={Errors?.sublabel?._errors}
              defaultValue={String(courseData?.sublabel)}
              options={[
                { value: "1", label: "Design" },
                { value: "2", label: "Developments" },
                { value: "3", label: "Business" },
                { value: "4", label: "Marketing" },
                { value: "5", label: "IT & Software" },
                { value: "6", label: "Music" },
                { value: "7", label: "Health & Fitness" },
                { value: "8", label: "Lifestyle" },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">
            Course Topic
          </div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full"
            type="text"
            placeholder="What is primarily taught in your course?"
            name="topic"
            defaultValue={courseData?.topic || ""}
          />
        </div>

        <div className="grid grid-cols-4 grid-rows-1 items-center gap-3">
          <div className="flex flex-col gap-2 ">
            <div className="text-sm font-semibold text-gray-900">
              Course Language
            </div>
            <Select
              error={Errors?.language?._errors}
              name={"language"}
              defaultValue={courseData?.language}
              options={[{ value: "english", label: "english" }]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-900">
              Subtitle Language (Optional)
            </div>
            <Select
              error={Errors?.sublanguage?._errors}
              name={"sublanguage"}
              defaultValue={courseData?.subtitle_language}
              options={[{ value: "english", label: "english" }]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-900">
              Course Level
            </div>
            <Select
              error={Errors?.level?._errors}
              name={"level"}
              defaultValue={courseData?.level}
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-900">Duration</div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full focus:outline-none"
              type="number"
              placeholder="e.g., 4 hours"
              name="duration"
              defaultValue={courseData?.duration || ""}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button type="button" className="bg-gray-100 text-gray-600 py-2 px-3">
            Cancel
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
