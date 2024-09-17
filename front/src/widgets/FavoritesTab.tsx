import React from "react"
import { Card } from "~/entities"
import { Spinner } from "~/shared/ui"
import { useFetchCatsByIDS, useFetchLikes } from "~/shared/api"

export function FavoritesTab() {
	const { data: likes } = useFetchLikes({})

	const favorites = React.useMemo(() => {
		const ids = new Set<string>()
		likes?.forEach(({ cat_id }) => ids.add(cat_id))
		return ids
	}, [likes])

	const { data: cats, isPending: isCatsLoading } = useFetchCatsByIDS([...favorites])

	if (isCatsLoading) {
		// Initial render
		return <Spinner containerProps={{ className: "absolute-center" }} />
	}

	return <section className={"cards"}>{cats?.map((cat) => <Card isFavorite={true} {...cat} key={cat.id} />)}</section>
}
