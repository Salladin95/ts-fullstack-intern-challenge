import React from "react"

export type PropsWithChildren<T = Record<string, unknown>> = T & { children: React.ReactNode }
