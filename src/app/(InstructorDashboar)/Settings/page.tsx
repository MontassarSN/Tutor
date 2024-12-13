"use client";
import React, { useEffect, useState } from "react";
import useCurrentUser from "@/queries/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { UpdateUser } from "@/api/users/updateUser";
import { UpdateInstructor } from "@/api/users/instructors/updateInstructor";
import InstructorSocials from "./components/instructorSocials";
import ChangePassword from "@/components/changePassword";
import { useInstructor } from "@/queries/useInstrcutor";

export default function Page() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { data: intructordata } = useInstructor(user?.user_id ?? "");
  console.log("🚀 ~ Page ~ intructordata:", intructordata);
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string>("");

  useEffect(() => setPreview(user?.pic ?? ""), [user?.pic]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const updateUserMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await UpdateUser(
        {
          FirstName: formData.get("firstName") as string,
          LastName: formData.get("lastName") as string,
          username: formData.get("username") as string,
          phone_number: formData.get("phone_number") as string,
        },
        formData
      );

      await UpdateInstructor({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      });
    },
    onSuccess: () => {
      alert("User information updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user", "active"],
      });
      queryClient.invalidateQueries({
        queryKey: ["instructors", user?.user_id],
      });
    },
    onError: (error: any) => {
      alert("Error updating user information: " + error.message);
    },
  });
  return (
    <div className="flex flex-col w-[60rem]  mx-auto">
      <form
        className="flex flex-col p-5 gap-3 w-full  bg-gray-50 "
        action={updateUserMutation.mutate}
      >
        <div className="flex justify-between  ">
          <div className="flex flex-col gap-3 w-[40rem] ">
            <h1 className="text-xl font-bold ">Account Settings</h1>
            <div className="text-sm font-semibold text-gray-900">Full Name</div>
            <div className="flex flex-row justify-between">
              <input
                className="border-gray-100 border-[1px] px-4 py-2 w-[45%] text-gray-500"
                type="text"
                placeholder="First Name..."
                name="firstName"
                defaultValue={user?.FirstName ?? ""}
              />
              <input
                className="border-gray-100 border-[1px] px-4 py-2 w-[45%] text-gray-500"
                type="text"
                placeholder="Last Name"
                name="lastName"
                defaultValue={user?.LastName ?? ""}
              />
            </div>
            <div className="text-sm font-semibold text-gray-900">Username</div>
            <div>
              <input
                className="border-gray-100 border-[1px] px-4 py-2 w-full text-gray-500"
                type="text"
                placeholder="Username"
                name="username"
                defaultValue={user?.username ?? ""}
              />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              Phone Number
            </div>
            <div>
              <input
                className="border-gray-100 border-[1px] px-4 py-2 w-full  text-gray-500"
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                defaultValue={user?.phone_number ?? ""}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2 bg-gray-200  px-4  justify-center">
            <Image
              src={preview || "/noAvatar.jpg"}
              width={200}
              height={200}
              alt="Profile Picture"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[name="filepicture"]')
                  ?.click()
              }
            />
            <input
              name="filepicture"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div className="text-xs text-gray-500 w-48 mx-auto">
              Image size should be under 1MB and image ration needs to be 1:1
            </div>
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-900 ">Title</div>
        <div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full text-gray-500"
            type="text"
            placeholder="title..."
            name="title"
            defaultValue={intructordata?.title ?? ""}
          />
        </div>
        <div className="text-sm font-semibold text-gray-900">Description</div>
        <div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full text-gray-500"
            type="text"
            placeholder="description..."
            name="description"
            defaultValue={intructordata?.description ?? ""}
          />
        </div>
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-2 w-[10rem]"
          type="submit"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
      <InstructorSocials />
      <ChangePassword />
    </div>
  );
}
