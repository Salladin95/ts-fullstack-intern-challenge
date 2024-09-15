import axios from "~/app/axios.ts"
import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery } from "@tanstack/react-query"
import { Cat, FilterOptions } from "~/shared/types"

async function fetchCats({ page = 0, limit = 1 }: FilterOptions) {
	const res = await axios.get<Cat[]>(
		`/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`,
	)
	return res.data
}

export const CATS_KEY = "cats"
export const INFINITE_CATS_KEY = "cats"

export function useFetchCats(options: FilterOptions) {
	return useQuery({ queryKey: [CATS_KEY, options.page, options.limit], queryFn: () => fetchCats(options) })
}

export type UseInfiniteQueryCustomOptions = Partial<Pick<UseInfiniteQueryOptions<Cat[], Error>, "enabled">>

export const useInfiniteCats = (options?: UseInfiniteQueryCustomOptions) => {
	return useInfiniteQuery<Cat[], Error>({
		queryKey: [INFINITE_CATS_KEY],
		queryFn: ({ pageParam = 0 }) => fetchCats({ page: pageParam as number, limit: 20 }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length === 0) {
				return undefined
			}
			return allPages.length
		},
		getPreviousPageParam: (_, allPages) => {
			if (allPages.length <= 1) {
				return undefined
			}
			return allPages.length - 2
		},
		...options,
	})
}
