import create from 'zustand'
import shallow from 'zustand/shallow'
import type { RefObject } from 'react'

interface StoreState {
  dom?: RefObject<HTMLElement>
}

const useStoreImpl = create<StoreState>(() => {
  return {
    dom: undefined,
  }
})

const useStore = <U>(selector: (state: StoreState) => U) =>
  useStoreImpl<U>(selector, shallow)
Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState }
export default useStore
