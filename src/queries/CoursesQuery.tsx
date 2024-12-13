import getCourses from "@/api/course/coursesdata";
import { infinityPagination } from "@/helpers/infinityPagination";
import { Tables } from "@/types/database.types";

export interface CoursesQueryType {
  page: number;
  limit: number;
  search?: { column: keyof Tables<"courses">; value: string };
  filters?: {
    type?: string;
    status?: string;
  };
}

const coursesQuery = (args: CoursesQueryType) => ({
  queryKey: [
    "courses",
    {
      ...args,
    },
  ],
  queryFn: async () => {
    const [data, countData] = await Promise.all([
      getCourses({
        page: args.page,
        limit: args.limit,
        search: args.search,
        filters: args.filters,
      }),
      getCourses({
        page: args.page,
        limit: args.limit,
        search: args.search,
        filters: args.filters,
        count: { count: "exact", head: true },
      }).then((res) => ({
        count: res.count,
        error: res.error,
      })),
    ]);

    return {
      ...infinityPagination(data?.data ?? [], {
        page: args.page,
        limit: args.limit,
        total_count: countData.count ?? 0,
      }),
      error: data.error || countData.error,
    };
  },
});

export { coursesQuery };
