import "./index.css"
import axios from "~/app/axios.ts"
import React from "react"

async function fetchCats() {
	const res = await axios.get(
		"/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
	)
	return res.data
}

export function App() {
	React.useEffect(() => {
		;(async function () {
			const cats = await fetchCats()
			console.log(cats)
		})()
	}, [])
	return <>Here we go</>
}
