import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

interface MoonProps {
  radius?: number
}

const Moon = ({ radius = 10 }: MoonProps): JSX.Element => {
  const moonTexture = useLoader(TextureLoader, 'moon/2k_moon.jpg')

  return (
    <mesh name='moon'>
      <sphereGeometry args={[radius, 1000, 1000]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  )
}

export default Moon