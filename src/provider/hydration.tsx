"use server";
import { QueriesConfig } from "@/constants/queries";
import { ActiveUserQuery } from "@/queries/ActiveUserQuery";
import { CoursesQuery } from "@/queries/CoursesQuery";
import { IntructorsQuery } from "@/queries/InstructorQuery";
import { LabelcolorsQuery } from "@/queries/LabelcolorsQuery";
import { NewestCoursesQuery } from "@/queries/NewestCoursesQuery";
import { TopCoursesQuery } from "@/queries/TopCoursesQuery";
import { TopIntructorsQuery } from "@/queries/TopIntructorsQuery";
import { UsersQuery } from "@/queries/UsersQuery";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
export default async function Hydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient(QueriesConfig);
  await Promise.all([
    queryClient.prefetchQuery(CoursesQuery(1, 10)),
    queryClient.prefetchQuery(LabelcolorsQuery),
    queryClient.prefetchQuery(TopCoursesQuery),
    queryClient.prefetchQuery(NewestCoursesQuery),
    queryClient.prefetchQuery(ActiveUserQuery),
    queryClient.prefetchQuery(IntructorsQuery),
    queryClient.prefetchQuery(UsersQuery),
    queryClient.prefetchQuery(TopIntructorsQuery),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
