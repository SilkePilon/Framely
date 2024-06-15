"use client";

// import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function Providers({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <SessionProvider>{children}</SessionProvider>;
}
