"use client";
import React, { useEffect, useState } from 'react';
import { useOption } from '../context/OptionContext';
import { InsertCourseData } from '@/api/insertcoursedata';
import { getCourseDataById } from '@/api/getCourseDataById'; // Import the function
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Import useRouter
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { useCourseData } from '@/queries/useCourse';

export default function BasicInfoForm() {
    const { setSelectedOption } = useOption();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    // Get courseId from URL parameters
    const courseId = searchParams.get('courseId');
    const parsedCourseId = courseId ? parseInt(courseId, 10) : null; // Convert courseId to number


    const { data: courseData, refetch } = useCourseData(parsedCourseId as number);


    const courseSchema = z.object({
        title: z.string().min(1, "Title is required"),
        subtitle: z.string().optional(),
        label: z.string().nonempty("Course category is required"),
        sublabel: z.string().nonempty("Course sub-category is required"),
        topic: z.string().min(1, "Course topic is required"),
        language: z.string().nonempty("Course language is required"),
        subtitle_language: z.string().optional(),
        level: z.string().nonempty("Course level is required"),
        duration: z.string().regex(/^\d+$/, "Duration must be a number").optional(),
    });

    // Mutation to insert course data
    const addCourseMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const data = {
                title: String(formData.get("title")),
                subtitle: String(formData.get("subtitle")),
                label: String(formData.get("label")),
                sublabel: String(formData.get("sublabel")),
                topic: String(formData.get("topic")),
                language: String(formData.get("language")),
                subtitle_language: String(formData.get("sublanguage")),
                level: String(formData.get("level")),
                duration: String(formData.get("duration")),
            };

            // Validate form data using Zod
            const parseResult = courseSchema.safeParse(data);

            if (!parseResult.success) {
                toast({
                    variant: "destructive",
                    title: "Error Adding Course",
                    description: "Please fill the form correctly.",
                });
                throw new Error(parseResult.error.message);
            }

            const courseId = await InsertCourseData({
                title: data.title,
                label: parseInt(data.label),
                subtitle: data.subtitle,
                sublabel: parseInt(data.sublabel),
                topic: data.topic,
                language: data.language,
                subtitle_language: data.subtitle_language,
                level: data.level,
                duration: data.duration ? parseInt(data.duration) : undefined,
            });

            return courseId;
        },
        onSuccess: async (courseId) => {
            toast({
                variant: "success",
                title: "Adding Course successfully",
                description: "Your course basic information is inserted successfully.",
            });
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
            router.push(`/AddCourse?courseId=${courseId}`);
            setSelectedOption("option2");
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Error Adding Course",
                description: "Please check your internet connection and try again later.",
            });
            console.error("Error adding course:", error.message);
        },
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // If courseId exists, set selected option and return
        if (courseId) {
            setSelectedOption("option2");
            return;
        }

        const formData = new FormData(e.currentTarget);
        addCourseMutation.mutate(formData);
    };

    return (
        <div className='flex flex-col gap-5'>
            <form
                className='flex flex-col gap-5'
                onSubmit={handleFormSubmit} // Handle form submission
            >
                <div className="text-sm font-semibold text-gray-900">Title</div>
                <div>
                    <input
                        className="border-gray-100 border-[1px] px-4 py-2 w-full"
                        type="text"
                        placeholder="Your course title"
                        name="title"
                        defaultValue={courseData?.title || ''}
                    />
                </div>
                <div className="text-sm font-semibold text-gray-900">Subtitle</div>
                <div>
                    <input
                        className="border-gray-100 border-[1px] px-4 py-2 w-full"
                        type="text"
                        placeholder="Your course subtitle"
                        name="subtitle"
                        defaultValue={courseData?.subtitle || ''}
                    />
                </div>
                <div className='grid grid-cols-2 grid-rows-2 items-center gap-3'>
                    <div className="text-sm font-semibold text-gray-900">Course Category</div>
                    <div className="text-sm font-semibold text-gray-900">Course Sub-category</div>
                    <select className='text-gray-500 text-sm' id="label" name="label" defaultValue={courseData?.label || ''}>
                        <option value="1">Design</option>
                        <option value="2">Developments</option>
                        <option value="3">Business</option>
                        <option value="4">Marketing</option>
                        <option value="5">IT & Software</option>
                        <option value="6">Music</option>
                        <option value="7">Health & Fitness</option>
                        <option value="8">Lifestyle</option>
                    </select>
                    <select className='text-gray-500 text-sm' id="sublabel" name="sublabel" defaultValue={courseData?.sublabel || ''}>
                        <option value="1">Design</option>
                        <option value="2">Developments</option>
                        <option value="3">Business</option>
                        <option value="4">Marketing</option>
                        <option value="5">IT & Software</option>
                        <option value="6">Music</option>
                        <option value="7">Health & Fitness</option>
                        <option value="8">Lifestyle</option>
                    </select>
                </div>
                <div className="text-sm font-semibold text-gray-900">Course Topic</div>
                <div>
                    <input
                        className="border-gray-100 border-[1px] px-4 py-2 w-full"
                        type="text"
                        placeholder="What is primarily taught in your course?"
                        name="topic"
                        defaultValue={courseData?.topic || ''}
                    />
                </div>
                <div className='grid grid-cols-4 grid-rows-2 items-center gap-3'>
                    <div className="text-sm font-semibold text-gray-900">Course Language</div>
                    <div className="text-sm font-semibold text-gray-900">Subtitle Language (Optional)</div>
                    <div className="text-sm font-semibold text-gray-900">Course Level</div>
                    <div className="text-sm font-semibold text-gray-900">Duration</div>
                    <select className='text-gray-500 text-sm' name="language" defaultValue={courseData?.language || ''}>
                        <option value="">Select...</option>
                        <option value="english">English</option>
                    </select>
                    <select className='text-gray-500 text-sm' name="sublanguage" defaultValue={courseData?.subtitle_language || ''}>
                        <option value="">Select...</option>
                        <option value="english">English</option>
                    </select>
                    <select className='text-gray-500 text-sm' name="level" defaultValue={courseData?.level || ''}>
                        <option value="">Select...</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <input
                        className="border-gray-100 border-[1px] px-4 py-2 w-full"
                        type="text"
                        placeholder="e.g., 4 hours"
                        name="duration"
                        defaultValue={courseData?.duration || ''}
                    />
                </div>
                <div className='w-full flex justify-between'>
                    <button type="button" className='bg-gray-100 text-gray-600 py-2 px-3'>Cancel</button>
                    <button type="submit" className="bg-customText text-white py-2 px-4">
                        Save & next
                    </button>
                </div>
            </form>
        </div>
    );
}
