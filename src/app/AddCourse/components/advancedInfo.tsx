"use client";
import React, { useEffect, useState } from 'react';
import PicVidUpload from './PicVidUpload';
import CourseSubjects from './courseSubjects';
import CourseAudience from './courseAudience';
import CourseRequirements from './courseRequirements';
import { useOption } from '../context/OptionContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { updateCourseStep2 } from '@/api/updateCourseStep2';
import { getCourseDataById } from '@/api/getCourseDataById';
import { useCourseData } from '@/queries/useCourse';
import { Tables } from '@/types/database.types';

export default function AdvancedInfo() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setSelectedOption } = useOption();
  const [subjects, setSubjects] = useState<string[]>(Array(4).fill(''));
  const [audience, setAudience] = useState<string[]>(Array(4).fill(''));
  const [requirements, setRequirements] = useState<string[]>(Array(4).fill(''));
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const parsedCourseId = courseId ? parseInt(courseId, 10) : null; // Convert courseId to number


  const { data: courseData, refetch } = useCourseData(parsedCourseId as number);


  const updateCourseMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (courseId) {
        const courseIdNumber = Number(courseId);

        await updateCourseStep2(
          formData,
          courseIdNumber,
          subjects,
          audience,
          requirements
        );
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Adding Changes Successfully",
        description: "Your course Advanced information is inserted successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      setSelectedOption("option3");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error Adding to Course",
        description: "Please check your internet connection and try again later.",
      });
      console.error("Error adding course:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateCourseMutation.mutate(formData);
  };

  return (
    <div className='py-5 px-10 flex flex-col gap-5 w-[60rem]'>
      <div className='flex justify-between w-full'>
        <div className='text-2xl font-bold'>Advance Informations</div>
        <div className='flex gap-2'>
          <button className="bg-customBg text-customText font-semibold py-2 px-4">
            Save
          </button>
          <button className=" text-customText font-semibold py-2 px-4">
            Save Preview
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
        <PicVidUpload data={courseData as Tables<"courses">} />
        <div className="text-sm font-semibold text-gray-900">Course Descriptions</div>
        <textarea name="description" className='w-full h-[10rem] border-gray-100 border-[1px] px-4 py-2' placeholder='Write a brief description of your course' defaultValue={courseData?.description || ''}></textarea>
        <CourseSubjects subjects={subjects} setSubjects={setSubjects} data={courseData as Tables<"courses">} />
        <CourseAudience audience={audience} setAudience={setAudience} data={courseData as Tables<"courses">} />
        <CourseRequirements requirements={requirements} setRequirements={setRequirements} data={courseData as Tables<"courses">} />
        <div className='w-full flex justify-between'>
          <button type="button" onClick={() => setSelectedOption("option1")} className='bg-gray-100 text-gray-600 py-2 px-3'>Previous</button>
          <button type="submit" className="bg-customText text-white py-2 px-4">
            Save & next
          </button>
        </div>
      </form>
    </div>
  );
}
