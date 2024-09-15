import React from "react"

export type PropsWithChildren<T = Record<string, unknown>> = T & { children: React.ReactNode }

export type FilterOptions = {
	page?: number
	limit?: number
}

export type Cat = {
	url: string
	id: string
}

export type IconProps = React.HTMLAttributes<SVGElement> & { viewBox?: string }

export type TabType = {
	id: string
	label: string
}

export enum TabOption {
	ALL = "all",
	FAVORITES = "favorites",
}
