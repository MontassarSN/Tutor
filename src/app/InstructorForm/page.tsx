"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { InsertInstructorData } from "@/api/insertinstructordata";

const Page: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const insertInstructorMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const company_name = String(formData.get("companyName"));
      const title = String(formData.get("title"));
      const description = String(formData.get("description"));
      await InsertInstructorData({
        company_name,
        title,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["instructors"],
      });
      router.push("/");
    },
  });

  return (
    <div className="flex flex-col gap-5 py-10 bg-white">
      <div className="ml-10">
        <Link href="/">
          <div className="flex flex-row items-center gap-1">
            <div className="relative h-12 w-12">
              <Image
                src="/GraduationCap.jpg"
                alt="Graduation Cap"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h1 className="text-2xl font-bold">E-Tutor</h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-5 px-30 justify-center">
        <form
          className="flex flex-col gap-5 p-10 w-[50rem] m-auto bg-gray-50"
          action={insertInstructorMutation.mutate}
        >
          <h1 className="text-4xl font-bold m-auto py-10">
            Become An Instructor
          </h1>
          <div className="text-sm font-semibold text-gray-900">
            Company Name
          </div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full"
              type="text"
              placeholder="Company Name"
              name="companyName"
            />
          </div>
          <div className="text-sm font-semibold text-gray-900">JOB TITLE</div>
          <div>
            <select className="p-2" name="title">
              <option value="Senior Developer">Senior Developer</option>
              <option value="Digital Product Designer">
                Digital Product Designer
              </option>
              <option value="Adobe Instructor">Adobe Instructor</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Photographer">Photographer</option>
            </select>
          </div>
          <div className="text-sm font-semibold text-gray-900">Description</div>
          <div>
            <textarea
              className="border-gray-100 border-[1px] px-4 py-2 w-full"
              placeholder="Write something about your skills, experiences..."
              name={"description"}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <span className="text-sm text-gray-500">
                I agree to the E-Tutor{" "}
                <span className="text-blue-800">Terms and Conditions</span>
              </span>
            </div>
            <button
              className="bg-customText text-white text-sm py-2 px-2"
              type="submit"
            >
              <div className="flex flex-row gap-2">
                <div>Confirm</div>
                <img
                  src="/ArrowRight.png"
                  alt="Arrow Right"
                  className="h-[20px] w-[20px]"
                />
              </div>
            </button>
          </div>
          {insertInstructorMutation.isError && (
            <div className="text-red-500 mt-4 p-4 border border-red-500 rounded">
              {insertInstructorMutation.error.message === "Instructor already exists"
                ? "You are already registered as an instructor."
                : "An error occurred while creating your profile. Please try again."}
            </div>
          )}
          {insertInstructorMutation.isSuccess && (
            <div className="text-green-500 mt-4 p-4 border border-green-500 rounded">
              Instructor profile created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
