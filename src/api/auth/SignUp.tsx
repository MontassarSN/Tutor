"use server";

import { ServerClient } from "@/lib/supabasessr";

export async function SignUp({
  email,
  password,
  options,
}: {
  email: string;
  password: string;
  options: object;
}) {
  const supabase = await ServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options,
  });
  if (error) throw new Error(error.message);
  return data.user;
}
