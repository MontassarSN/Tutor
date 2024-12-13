"use server";

import { ServerClient } from "@/lib/supabasessr";
export default async function approveInstructor(instuctorId : string)  {
    const supabase = await ServerClient(); 
    const { data, error } = await supabase
        .from("instructors")
        .update({approved: true})
        .eq("user_id", instuctorId)

    if (error) {
        console.log("🚀 ~ approveInstructor ~ error:", error.message)
        throw new Error(error.message);}
        
    return data ;
}

