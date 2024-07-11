"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabasessrts";

export default function LogForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Sign-in successful:", data.user);
      // You can also handle successful sign-in here, such as redirecting the user or updating the UI
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold align-middle py-10">
        Sign in to your account
      </h1>
      <div className="text-sm font-semibold text-gray-900">Email</div>
      <div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-sm font-semibold text-gray-900">Password</div>
      <input
        className="border-gray-100 border-[1px] px-4 py-2 tx-lg text-gray-500"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1">
          <input type="checkbox" />
          <span className="text-sm text-gray-500">Remember me</span>
        </div>
        <button
          className="bg-customText text-white text-sm py-2 px-2"
          type="button"
          onClick={handleSignIn}
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
    </div>
  );
}
