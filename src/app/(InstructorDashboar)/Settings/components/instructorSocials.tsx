"use client";
import { UpdateInstructor } from "@/api/users/instructors/updateInstructor";
import { useToast } from "@/components/ui/use-toast";
import useCurrentUser from "@/queries/useCurrentUser";
import { useInstructor } from "@/queries/useInstrcutor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function InstructorSocials() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { data: intructordata } = useInstructor(user?.user_id ?? "");
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await UpdateInstructor({
        website: formData.get("website") as string,
        facebook: formData.get("facebook") as string,
        instagram: formData.get("instagram") as string,
        linkdin: formData.get("linkdin") as string,
        twitter: formData.get("twitter") as string,
        whatsup: formData.get("whatsup") as string,
        youtube: formData.get("youtube") as string,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["instructors", user?.user_id],
      });
      toast({
        variant: "success",
        title: "Changes Saved Successfully",
        description: "Your social profile has been updated",
      });
    },
    onError: (error: any) => {
      alert("Error updating user information: " + error.message);
    },
  });
  return (
    <div className=" flex flex-col gap-5 p-5 w-[60rem]">
      <h1 className="text-xl font-bold ">Social Profile</h1>
      <form className="flex flex-col gap-5" action={updateUserMutation.mutate}>
        <div className="flex flex-col gap-2">
          <div>Personal Website</div>
          <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
            <Image
              src="/instructor_socials/Globe.png"
              alt="aaa"
              width={20}
              height={20}
            />

            <input
              type="text"
              placeholder="Personal website or portfolio url..."
              className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
              defaultValue={intructordata?.website ?? ""}
              name="website"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <div className="flex flex-col gap-2">
            <div>Facebook</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/facebook.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.facebook ?? ""}
                name="facebook"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>Instagram</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/instagram.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.instagram ?? ""}
                name="instagram"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Linkdin</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/linkdin.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.linkdin ?? ""}
                name="linkdin"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <div className="flex flex-col gap-2">
            <div>Twitter</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/twitter.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.twitter ?? ""}
                name="twitter"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>Whatsapp</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/whatsup.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Phone number"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.whatsup ?? ""}
                name="whatsup"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Youtube</div>
            <div className="flex flex-row gap-1 items-center border-gray-200 border-2 px-2">
              <Image
                src="/instructor_socials/youtube.png"
                alt="aaa"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-96 p-3 hover:border-none focus:outline-none text-gray-500 "
                defaultValue={intructordata?.youtube ?? ""}
                name="youtube"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-2 w-[10rem]   "
          type="submit"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
