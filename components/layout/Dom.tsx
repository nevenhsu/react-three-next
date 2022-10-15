import { setState } from 'store'
import { useEffect, useRef } from 'react'
import { Container } from '@mantine/core'
import type { FCC } from 'types'

const Dom: FCC<{}> = ({ children }) => {
  const ref = useRef(null)

  useEffect(() => {
    setState({ dom: ref })
  }, [])

  return (
    <Container
      ref={ref}
      fluid
      sx={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
      }}
    >
      {children}
    </Container>
  )
}

export default Dom
