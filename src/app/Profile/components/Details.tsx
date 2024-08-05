"use client";
import React, { useState } from "react";
import useCurrentUser from "@/queries/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { UpdateUser } from "@/api/updateUser";

export default function Details() {
  const { data: user, isLoading, error } = useCurrentUser();
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
      await UpdateUser({
        FirstName: formData.get("firstName") as string,
        LastName: formData.get("lastName") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
      }, formData);
    },
    onSuccess: () => {
      alert("User information updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user", "active"]
      });
    },
    onError: (error: any) => {
      alert("Error updating user information: " + error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 px-30 justify-center">
        <form
          className="flex flex-col gap-5 p-10 w-[50rem] m-auto bg-gray-50"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateUserMutation.mutate(formData);
          }}
        >
          <h1 className="text-4xl font-bold m-auto py-10">Profile Information</h1>
          <div className="m-auto relative">
            <Image
              src={preview || user?.pic || "/noAvatar.jpg"}
              width={128}
              height={128}
              className="rounded-full"
              alt="Profile Picture"
              onClick={() => document.querySelector<HTMLInputElement>('input[name="filepicture"]')?.click()}
            />
            <input
              name="filepicture"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="text-sm font-semibold text-gray-900">Full Name</div>
          <div className="flex flex-row justify-between">
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-[45%]"
              type="text"
              placeholder="First Name..."
              name="firstName"
              defaultValue={user?.FirstName ?? ""}
            />
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-[45%]"
              type="text"
              placeholder="Last Name"
              name="lastName"
              defaultValue={user?.LastName ?? ""}
            />
          </div>
          <div className="text-sm font-semibold text-gray-900">Username</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full"
              type="text"
              placeholder="Username"
              name="username"
              defaultValue={user?.username ?? ""}
            />
          </div>
          <div className="text-sm font-semibold text-gray-900">Email</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full"
              type="email"
              placeholder="Email Address"
              name="email"
              defaultValue={user?.email ?? ""}
            />
          </div>
          <button
            className="bg-customText text-white py-2 px-2 w-[10rem]"
            type="submit"
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
