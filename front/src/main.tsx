import React from "react"
import { App } from "~/app"
import ReactDOM from "react-dom/client"
import { Providers } from "./app/providers"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>,
)
