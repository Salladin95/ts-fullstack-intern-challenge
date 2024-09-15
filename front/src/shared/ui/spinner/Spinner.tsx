import { HTMLAttributes } from "react"
import { IconProps } from "~/shared/types"

import "./spinner.css"

type SpinnerProps = {
	containerProps?: IconProps
	circleProps?: HTMLAttributes<SVGCircleElement>
}

export function Spinner(props: SpinnerProps) {
	const { containerProps, circleProps } = props
	return (
		<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" {...containerProps}>
			<circle
				className="spin2"
				cx="400"
				cy="400"
				fill="none"
				r="60"
				strokeWidth="8"
				stroke="#835fce"
				strokeDasharray="534 1400"
				strokeLinecap="round"
				{...circleProps}
			/>
		</svg>
	)
}
