"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueriesConfig } from "@/constants/queries";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Store({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(QueriesConfig));
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
