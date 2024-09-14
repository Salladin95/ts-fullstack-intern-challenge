import { QueryProvider } from "./QueryProvider"
import { PropsWithChildren } from "~/shared/types"

export function Providers(props: PropsWithChildren) {
	return <QueryProvider>{props.children}</QueryProvider>
}
