"use server";

import { ServerClient } from "@/lib/supabasessr";
import { Tables } from "@/types/database.types";

export default async function fetchCourseComments(id:string ) : Promise<Tables<"comments">[]> {
    const supabase = await ServerClient();
    const { data, error } = await supabase.from('comments').select('*').eq('course_id', id);
    if (error) throw error;
    return data;

}

