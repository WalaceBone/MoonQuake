import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

import PulseGroup from './PulseGroup';
import Group from './Group';

interface MoonCanvas {
  position?: Vector3
  fov?: number
  aspect?: number
  near?: number
  far?: number
  width?: number
  height?: number
}

const MoonCanvas = ({
  position = new Vector3(0, 0, 20),
  fov = 60,
  aspect = window.innerWidth / window.innerHeight,
  near = 1,
  far = 2000,
  width = window.innerWidth,
  height = window.innerHeight,
}: MoonCanvas): JSX.Element => {
  return (
    <Canvas
      style={{ width, height }}
      camera={{ position, fov, aspect, near, far }}
    >
      <Suspense fallback={null}>
        <Group />
        <PulseGroup />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default MoonCanvas