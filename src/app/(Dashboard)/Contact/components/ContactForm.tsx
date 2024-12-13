import useCurrentUser from "@/queries/useCurrentUser";
import React from "react";

export default function ContactForm() {
  const { data } = useCurrentUser();
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold ">Get In touch</h1>
        <div className="text-sm text-gray-500">
          Feel free to contact us, we love to make new partners & friends
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="text-sm font-semibold text-gray-900 w-[45%]">
              First Name
            </div>
            <div className="text-sm font-semibold text-gray-900 w-[45%]">
              Last Name
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-[45%] text-sm text-gray-500"
              type="text"
              placeholder="First name..."
              value={data ? String(data.FirstName) : ""}
            />
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-[45%] text-sm text-gray-500"
              type="text"
              placeholder="Last name..."
              value={data ? String(data.LastName) : ""}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">Email</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full text-sm"
              type="email"
              placeholder="Email Address..."
              value={data ? String(data.email) : ""}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">Subject</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full text-sm"
              type="text"
              placeholder="Message Subject"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-gray-900">Message</div>
          <div>
            <input
              className="border-gray-100 border-[1px] px-4 py-2 w-full h-16  text-sm "
              type="text"
              placeholder="Message..."
            />
          </div>
        </div>
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  text-sm py-4 px-4 w-[10rem]"
          type="submit"
        >
          <div className="flex flex-row gap-2 ">
            <div>Send Message</div>
            <img
              src="/Send.png"
              alt="Arrow Right"
              className="h-[20px] w-[20px]"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
