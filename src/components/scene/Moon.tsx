import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { moon } from '../../constants';

const Moon = (): JSX.Element => {
  const moonTexture = useLoader(TextureLoader, 'moon/2k_moon.jpg')
  const { radius, widthSegments, heightSegments } = moon;

  return (
    <mesh name='moon'>
      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  )
}

export default Moon