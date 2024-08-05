"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignIn } from "@/api/signIn";
import { useToast } from "@/components/ui/use-toast";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const email = formData.get("email") as string;
      console.log("🚀 ~ mutationFn: ~ email:", email)
      const password = formData.get("password") as string;
      console.log("🚀 ~ mutationFn: ~ password:", password)
      await SignIn(email, password);
    },
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["user", "active"]
      });
      toast({
        variant: "success",
        title: "Sign In Success",
        description: "Welcome back!",
      });
      router.push("/");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "Try again later",
      });
    },
  });
};
