import { useMutation } from "@tanstack/react-query";
import validateZodShema from "helpers/zodValidation";
import React, { useState } from "react";
import { z } from "zod";
import { useToast } from "./ui/use-toast";
import ChangePasswordSupabase from "@/api/auth/ChangePasswordSupabase";

const schema = z
.object({
  current_password: z.string().min(6, "Current password is required"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  confirm_password: z.string(),
})
.superRefine((data, context) => {
  if (data.new_password !== data.confirm_password) {
    context.addIssue({
      path: ["confirm_password"],
      message: "Passwords must match",
      code: z.ZodIssueCode.custom,
    });
  }
});
type SchemaType = z.infer<typeof schema>;

export default function ChangePassword() {
  const { toast } = useToast();

const [Errors, setErrors] = useState<Partial<{[K in keyof SchemaType]: { _errors: SchemaType[K][] };}>>();

    const ChangePasswordMutation = useMutation({
      mutationFn: async (formData: FormData) => {
      const current_password = String(formData.get("current_password"));
      const new_password = String(formData.get("new_password"));
      const confirm_password = String(formData.get("confirm_password"));
     const { errors } = validateZodShema(formData, schema);

      if (errors) {
        setErrors(errors);
        const errorMessages = Object.values(errors).flat();
        toast({
          variant: "destructive",
          title: "Error ",
          description: "Please fill the form correctly.",
        });
        throw new Error(errorMessages.join(", "));
      }

      ChangePasswordSupabase({ current_password, new_password });

      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success ",
          description: "Password changed successfully.",
        });
        

      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error ",
          description: "Password ",
        });
        
      },
    });
  return (
    <div className="py-5">
      <h1 className="text-xl font-bold py-5 ">Change Password</h1>
      <form className="flex-col flex gap-3" action={ChangePasswordMutation.mutate}>
        <div className="text-sm font-semibold text-gray-900">
          Current Password
        </div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="text"
          placeholder="Current Password..."
          name="current_password"
        />
        <div className="text-sm font-semibold text-gray-900">New Password</div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="password"
          placeholder="New Password..."
          name="new_password"
        />
        <div className="text-sm font-semibold text-gray-900">
          Confirm Password
        </div>
        <input
          className="border-gray-100 border-[1px] px-4 py-2 w-full"
          type="password"
          placeholder="Confirm Password..."
          name="confirm_password"
        />
        <button
          className="bg-customText text-white hover:bg-hoverbutton hover:text-gray-50  py-2 px-2 w-[10rem]"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
