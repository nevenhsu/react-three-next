import _ from 'lodash'
import { createContext, useContext, useMemo, useState, useEffect } from 'react'

type AppState = {}

const MISSING_PROVIDER = Symbol()
const AppContext = createContext<
  | {
      state: AppState
      setState: (value: Partial<AppState>) => void
    }
  | typeof MISSING_PROVIDER
>(MISSING_PROVIDER)

export default function useAppContext() {
  const app = useContext(AppContext)
  if (app === MISSING_PROVIDER) {
    throw new Error('App hooks must be wrapped in a <AppProvider>')
  }
  return app
}

export function AppProvider(props: React.PropsWithChildren<{}>) {
  const { children } = props
  const [state, setState] = useState<AppState>({})

  const value = useMemo(
    () => ({
      state,
      setState: (value: Partial<AppState>) =>
        setState((state) => ({ ...state, ...value })),
    }),
    [state]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
