"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    // každý render re-generujeme nový query client, aby to nikdy nebylo stale skrze re-rendery
    // je to z tanstack-query dokumentace a je to třeba udělat
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}