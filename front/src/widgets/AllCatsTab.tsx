import React from "react"
import { Spinner } from "~/shared/ui"
import { Card } from "~/entities"
import { useInView } from "react-intersection-observer"
import { useFetchLikes, useInfiniteCats } from "~/shared/api"

export function AllCatsTab() {
	const { data: cats, isPending: isCatsLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteCats()
	const { data: likes } = useFetchLikes({})

	const favorites = React.useMemo(() => {
		const ids = new Set<string>()
		likes?.forEach(({ cat_id }) => ids.add(cat_id))
		return ids
	}, [likes])

	const { ref, inView } = useInView({
		threshold: 1,
	})

	React.useEffect(() => {
		if (inView) {
			hasNextPage && fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage])

	if (isCatsLoading) {
		// Initial render
		return <Spinner containerProps={{ className: "absolute-center" }} />
	}

	console.log(likes)

	return (
		<>
			<section className={"cards"}>
				{cats?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page.map((cat) => (
							<Card isFavorite={favorites?.has(cat.id)} key={cat.id} {...cat} />
						))}
					</React.Fragment>
				))}
			</section>
			<div ref={ref} />
			{isFetchingNextPage && <div className={"infinite-loader"}>... загружаем еще котиков ...</div>}
		</>
	)
}
