import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "~/shared/types"

export function QueryProvider(props: PropsWithChildren) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// to avoid re-fetching immediately on the client
				// staleTime: 120 * 1000,
				staleTime: 0,
				retry: false,
				refetchOnMount: true,
			},
		},
	})
	return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
