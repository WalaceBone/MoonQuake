import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { type DirectionalLight } from 'three'

const Sun = (): JSX.Element => {
  const sunRef = useRef<DirectionalLight>()

  useFrame(() => {
    // Calculate the sun's position based on time of day
    const timeOfDay = (Date.now() % (24 * 60 * 60)) / (24 * 60 * 60); // Current time as a fraction of a day
    const sunAngle = Math.PI * 2 * timeOfDay; // Angle around the moon's surface
    const distance = 20; // Distance of the sun from the moon's center
    const x = Math.cos(sunAngle) * distance;
    const z = Math.sin(sunAngle) * distance;

    // Update the sun's position
    sunRef.current.position.set(x, 100, z);
  })
  return (
    <directionalLight ref={sunRef} color={0xffffff} intensity={1} position={[0, 1, 0]} />
  )
}

export default Sun;
