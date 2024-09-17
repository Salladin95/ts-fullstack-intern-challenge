import axios from "~/app/axios.ts"
import { AxiosError, AxiosResponse } from "axios"
import { Cat, FilterOptions, Like } from "~/shared/types"
import {
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions,
} from "@tanstack/react-query"

const catsBaseUrl = import.meta.env.VITE_CATS_API_BASE_URL
const likesBaseURl = import.meta.env.VITE_LIKES_API_BASE_URL

async function fetchCats({ page = 0, limit = 1 }: FilterOptions): Promise<Cat[]> {
	const res = await axios.get<Cat[]>(
		`${catsBaseUrl}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`,
	)
	return res.data
}

async function fetchCat(id: string): Promise<Cat> {
	const res = await axios.get<Cat>(`${catsBaseUrl}/images/${id}`)
	return res.data
}

async function fetchCatsByIDS(ids: string[]): Promise<Cat[]> {
	const promises = ids.map((id) => fetchCat(id))
	return Promise.all(promises)
}

export const CAT_KEY = "cat"
export const CATS_BY_IDS_KEY = "cat"
export const CATS_KEY = "cats"
export const INFINITE_CATS_KEY = "infinite-cats"

export const LIKES_KEY = "cats"
export const INFINITE_LIKES_KEY = "infinite-cats"

export type UseQueryCustomOptions<FNData = unknown, ErrData = AxiosError, TData = unknown> = Omit<
	UseQueryOptions<FNData, ErrData, TData>,
	"queryFn" | "queryKey"
>

export function useFetchCats(
	filterOptions: FilterOptions,
	queryOptions?: UseQueryCustomOptions<Cat[], AxiosError, Cat[]>,
) {
	return useQuery({
		queryKey: [CATS_KEY, filterOptions.page, filterOptions.limit],
		queryFn: () => fetchCats(filterOptions),
		...queryOptions,
	})
}

export function useFetchCatsByIDS(ids: string[], queryOptions?: UseQueryCustomOptions<Cat[], AxiosError, Cat[]>) {
	return useQuery({ queryKey: [CATS_BY_IDS_KEY, ids], queryFn: () => fetchCatsByIDS(ids), ...queryOptions })
}

export type UseInfiniteCatsQueryCustomOptions = Partial<Pick<UseInfiniteQueryOptions<Cat[], Error>, "enabled">>

export const useInfiniteCats = (options?: UseInfiniteCatsQueryCustomOptions) => {
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

async function fetchLikes({ page = 0, limit = 1 }: FilterOptions) {
	const res = await axios.get<Like[]>(`${likesBaseURl}/likes?&page=${page}&limit=${limit}`)
	return res.data
}

export function useFetchLikes(options: FilterOptions) {
	return useQuery({ queryKey: [LIKES_KEY, options.page, options.limit], queryFn: () => fetchLikes(options) })
}

export type UseInfiniteLikesQueryCustomOptions = Partial<Pick<UseInfiniteQueryOptions<Like[], Error>, "enabled">>

export const useInfiniteLikes = (options?: UseInfiniteLikesQueryCustomOptions) => {
	return useInfiniteQuery<Like[], Error>({
		queryKey: [INFINITE_LIKES_KEY],
		queryFn: ({ pageParam = 0 }) => fetchLikes({ page: pageParam as number, limit: 20 }),
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

type AddLikePayload = {
	cat_id: string
	created_at?: string
}

type AddLikeResponse = {
	cat_id: string
	created_at: string
}

async function addLike(payload: AddLikePayload): Promise<AxiosResponse<AddLikeResponse>> {
	return axios.post<AddLikeResponse>(`${likesBaseURl}/likes`, payload)
}

export function useAddLikeMutation(
	options?: Omit<UseMutationOptions<AxiosResponse<AddLikeResponse>, AxiosError, AddLikePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: addLike,
		...options,
	})
}

async function removeLike(id: string): Promise<AxiosResponse> {
	return axios.delete<AddLikeResponse>(`${likesBaseURl}/likes/${id}`)
}

export function useRemoveLikeMutation(
	options?: Omit<UseMutationOptions<AxiosResponse<AddLikeResponse>, AxiosError, string>, "mutationFn">,
) {
	return useMutation({
		mutationFn: removeLike,
		...options,
	})
}
