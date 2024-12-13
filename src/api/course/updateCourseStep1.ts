"use server";
import { ServerClient } from "@/lib/supabasessr";
import { TablesUpdate } from "@/types/database.types";

export async function UpdateCourseStep1(args: TablesUpdate<"courses">,courseId: string) {
    const supabase = await ServerClient();
    
    const { error } = await supabase
        .from('courses')
        .update({...args})
        .eq('id', courseId); 

    if (error) {
        throw new Error(`Error updating course: ${error.message}`);
    }
}
