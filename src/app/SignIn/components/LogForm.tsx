"use client";
import React, { useRef } from "react";
import { useSignIn } from "@/queries/useSignIn";

const LogForm: React.FC = () => {
  const SignIn = useSignIn();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold align-middle py-10">
        Sign in to your account
      </h1>
      <form action={SignIn.mutate} className="flex flex-col gap-5">
        <div className="text-sm font-semibold text-gray-900">Email</div>
        <div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 w-full"
            type="email"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="text-sm font-semibold text-gray-900">Password</div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 tx-lg text-gray-500"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1">
            <input type="checkbox" />
            <span className="text-sm text-gray-500">Remember me</span>
          </div>
          <button
            className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  text-sm py-2 px-2"
            type="submit"
          >
            <div className="flex flex-row gap-2">
              <div>Sign In</div>
              <img
                src="/ArrowRight.png"
                alt="Arrow Right"
                className="h-[20px] w-[20px]"
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogForm;
