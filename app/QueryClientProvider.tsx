"use client"

import { QueryClient, QueryClientProvider as ReactQuery } from "@tanstack/react-query"
import { PropsWithChildren } from "react";

const QueryClientProvider = ({children}: PropsWithChildren) => {
    const queryClient = new QueryClient();
  return (
      <ReactQuery client={queryClient}>
          {children}
    </ReactQuery>
  )
}

export default QueryClientProvider
