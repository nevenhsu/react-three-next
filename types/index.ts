import { FC, PropsWithChildren } from 'react'
import type { NextPage } from 'next'

// Custom Type for a React functional component with props AND CHILDREN
export type FCC<P = {}> = FC<PropsWithChildren<P>>

export type NextPageWithR3F<P> = NextPage<P> & {
  r3f?: FC
  title: string
}
