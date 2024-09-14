import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "~/shared/types"

export function QueryProvider(props: PropsWithChildren) {
	const queryClient = new QueryClient()
	return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
