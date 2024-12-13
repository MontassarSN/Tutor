"use server";
import { ServerClient } from "@/lib/supabasessr"; // Adjust the import path as needed
import { Tables } from "@/types/database.types";
import { PostgrestError } from "@supabase/postgrest-js";

interface GetResourcesArgs {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"courses">; value: string };
  filters?: {
    type?: string;
    status?: string;
  };
  count?: { count: "exact" | "planned" | "estimated"; head: boolean };
}

interface FetchUserResourcesResponse {
  data: Tables<"courses">[] | null;
  error: PostgrestError | null;
  count: number | null;
}

export default async function getCourses({
  page = 1,
  limit = 10,
  search,
  filters,
  count,
}: GetResourcesArgs): Promise<FetchUserResourcesResponse> {
  const supabase = await ServerClient();

  let query = supabase
    .from("courses")
    .select("*", { count: count?.count || "exact", head: count?.head || false })
    .throwOnError();

  if (search?.value) {
    query = query.ilike(`${search.column}`, `%${search.value}%`);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const start = (page - 1) * limit;
  const end = start + limit - 1;
  query = query.range(start, end);

  const { data, error, count: totalCount } = await query;

  return {
    data: data ?? [],
    error,
    count: totalCount,
  };
}
