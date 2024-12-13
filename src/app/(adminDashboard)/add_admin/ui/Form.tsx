"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { InsertUser } from "@/api/users/insertUser";
import signUp from "@/api/auth/SignUp";

interface CustomError {
  message: string;
}

// Define the schema using Zod with enhanced validation rules
const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  username: z.string().min(1, "username is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const Form: React.FC = () => {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const signUpMutation = useMutation<void, CustomError, FormData>({
    mutationFn: async (formData: FormData) => {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      const firstName = String(formData.get("firstName"));
      const lastName = String(formData.get("lastName"));
      const username = String(formData.get("username"));
      const result = schema.safeParse({
        firstName,
        lastName,
        username,
        email,
        password,
      });                                           
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach((error) => {
          if (error.path && error.path[0]) {
            formattedErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(formattedErrors);
        throw new Error("Validation error");
      }
      const user = await signUp({
        email,
        password,
      });
      if (user.data?.user?.id) {
        await InsertUser({
          FirstName: firstName,
          LastName: lastName,
          username,
          email,
          user_id: user.data?.user?.id,
          role: "admin",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "active"]
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <form action={signUpMutation.mutate} className="flex flex-col gap-5 mx-auto">
      <h1 className="text-4xl font-bold align-middle py-10">
        Create Admin account
      </h1>
      <div className="text-sm font-semibold text-gray-900">Full Name</div>
      <div className="flex flex-row justify-between">
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500"
          type="text"
          placeholder="First Name..."
          name="firstName"
        />
        {errors.firstName && (
          <div className="text-red-500">{errors.firstName}</div>
        )}
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-[45%]"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        {errors.lastName && (
          <div className="text-red-500">{errors.lastName}</div>
        )}
      </div>
      <div className="text-sm font-semibold text-gray-900">username</div>
      <div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="text"
          placeholder="username"
          name="username"
        />
        {errors.username && (
          <div className="text-red-500">{errors.username}</div>
        )}
      </div>
      <div className="text-sm font-semibold text-gray-900">Email</div>
      <div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="email"
          placeholder="Email Address"
          name="email"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-sm font-semibold text-gray-900 w-[45%]">
          Password
        </div>
        <div className="text-sm font-semibold text-gray-900 w-[45%]">
          Confirm Password
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500"
          type="password"
          placeholder="Create Password"
          name="password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1">
          <input type="checkbox" />
          <span className="text-sm text-gray-500">
            I agree to the E-Tutor{" "}
            <span className="text-blue-800">Terms and Conditions</span>
          </span>
        </div>
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  text-sm py-2 px-2"
          type="submit"
        >
          <div className="flex flex-row gap-2">
            <div>Create Account</div>
            <img
              src="/ArrowRight.png"
              alt="Arrow Right"
              className="h-[20px] w-[20px]"
            />
          </div>
        </button>
      </div>
      {signUpMutation.isError && (
        <div className="text-red-500">{signUpMutation.error?.message}</div>
      )}
      {signUpMutation.isSuccess && (
        <div className="text-green-500">Sign-up successful!</div>
      )}
    </form>
  );
};

export default Form;
