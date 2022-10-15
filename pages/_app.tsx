import 'styles/globals.css'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { MantineProvider } from '@mantine/core'
import Header from 'components/Head'
import Dom from 'components/layout/Dom'
import type { AppProps } from 'next/app'
import type { NextPageWithR3F } from 'types'

type AppPropsWithR3F<P> = AppProps<P> & {
  Component: NextPageWithR3F<P>
  pageProps: P & { title?: string }
}

const LCanvas = dynamic(() => import('components/layout/Canvas'), {
  ssr: true,
})

function App<P>({ Component, pageProps }: AppPropsWithR3F<P>) {
  return (
    <>
      <Header title={pageProps.title} />
      <MantineProvider
        theme={{ colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Dom>
          <Component {...pageProps} />
        </Dom>
        {Component?.r3f && <LCanvas>{Component.r3f(pageProps)}</LCanvas>}
      </MantineProvider>
    </>
  )
}

export default App
