import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { AppProvider } from 'hooks/useAppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <MantineProvider
        theme={{ colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </AppProvider>
  )
}

export default MyApp
