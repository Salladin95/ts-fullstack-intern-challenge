import React from "react"
import { useInfiniteCats } from "~/shared/api"
import { FavoriteIcon, Spinner } from "~/shared/ui"
import { useInView } from "react-intersection-observer"

export function AllCatsTab() {
	const { data: cats, isPending: isCatsLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteCats()

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

	return (
		<>
			<section className={"cards"}>
				{cats?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page.map((cat) => (
							<div className={"card"} key={cat.id}>
								<img src={cat.url} alt={"cat"} />
								<FavoriteIcon />
							</div>
						))}
					</React.Fragment>
				))}
			</section>
			<div ref={ref} />
			{isFetchingNextPage && <div className={"infinite-loader"}>... загружаем еще котиков ...</div>}
		</>
	)
}
