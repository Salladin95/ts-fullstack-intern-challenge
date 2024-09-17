import { Cat } from "~/shared/types"
import { FavoriteFilledIcon, FavoriteIcon } from "~/shared/ui"
import { LIKES_KEY, useAddLikeMutation, useRemoveLikeMutation } from "~/shared/api"
import { useQueryClient } from "@tanstack/react-query"

type CardProps = {
	isFavorite: boolean
} & Cat

export function Card(props: CardProps) {
	const { url, id, isFavorite } = props
	const queryClient = useQueryClient()

	function handleSuccessfulMutation() {
		queryClient.refetchQueries({ queryKey: [LIKES_KEY] })
	}

	const { mutate: addLike } = useAddLikeMutation({
		onSuccess: handleSuccessfulMutation,
	})

	const { mutate: removeLike } = useRemoveLikeMutation({
		onSuccess: handleSuccessfulMutation,
	})

	function handleAddLike() {
		addLike({ cat_id: id })
	}

	function handleRemoveLike() {
		removeLike(id)
	}

	return (
		<div className={"card"} key={id}>
			<img src={url} alt={"cat"} />
			{!isFavorite ? (
				<button onClick={handleAddLike}>
					<FavoriteIcon />
				</button>
			) : (
				<button onClick={handleRemoveLike}>
					<FavoriteFilledIcon />
				</button>
			)}
		</div>
	)
}
