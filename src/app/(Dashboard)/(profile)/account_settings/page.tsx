"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { UpdateUser } from "@/api/users/updateUser";
import useCurrentUser from "@/queries/useCurrentUser";
import ChangePassword from "@/components/changePassword";

export default function Page() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string>("");

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
          email: formData.get("email") as string,
        },
        formData
      );
    },
    onSuccess: () => {
      alert("User information updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user", "active"],
      });
    },
    onError: (error: any) => {
      alert("Error updating user information: " + error.message);
    },
  });
  return (
    <div className="flex flex-col w-[60rem]  mx-auto">
      <h1 className="text-xl font-bold ">Account Settings</h1>

      <form
        className="flex py-5 gap-20    w-[60rem]  bg-gray-50 items-center"
        action={updateUserMutation.mutate}
      >
        <div className=" flex flex-col gap-2 bg-gray-200  p-4 justify-center">
          <Image
            src={preview || user?.pic || "/noAvatar.jpg"}
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
        <div className="flex-col flex gap-3 w-[40rem]">
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
          <div className="text-sm font-semibold text-gray-900">Email</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full text-gray-500"
              type="email"
              placeholder="Email Address"
              name="email"
              defaultValue={user?.email ?? ""}
            />
          </div>
          <button
            className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-2 w-[10rem]"
            type="submit"
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
      <ChangePassword />
    </div>
  );
}
