"use server";
import { ServerClient } from "@/lib/supabasessr";

export default async function ChangePasswordSupabase({
  current_password,
  new_password,
}: {
  current_password: string; 
  new_password: string;
}) {
  const supabase = await ServerClient();

  const { data: sessionData, error } = await supabase.auth.getSession();
  if (error) throw new Error("Failed to get session.");
  const session = sessionData.session;
  const email = session?.user?.email;
  if (!email) {
    throw new Error("User email not found.");
  }
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: current_password,
    });
    if (signInError) {
      throw new Error("Current password is incorrect.");
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: new_password,
    });
    if (updateError) {
      throw new Error(updateError.message);
    }
  } catch (err) {
    throw new Error("Failed to change password.");
  }
}
