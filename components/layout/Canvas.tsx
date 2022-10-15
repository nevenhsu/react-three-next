import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import useStore from 'store'
import type { FCC } from 'types'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    const domElement = dom?.current

    if (control.current && domElement) {
      const originalTouchAction = domElement.style.touchAction
      domElement.style.touchAction = 'none'

      return () => {
        domElement.style.touchAction = originalTouchAction
      }
    }
  }, [dom, control])

  // domElement: Optional event source
  return <OrbitControls ref={control} domElement={dom?.current ?? undefined} />
}

const LCanvas: FCC = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect?.(dom?.current)}
    >
      <LControl />
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
