import { useMemo } from 'react'

interface FramesProps {
  radius?: number
}

const Frames = ({ radius = 10 }: FramesProps): JSX.Element[] => {
  const latSegments = 18;
  const longSegments = 36;
  const framesContent = useMemo(() => {
    const framesList = []
    for (let i = radius; i > 0; --i) {
      framesList.push((
        <mesh key={`frames-${i}`}>
          <sphereGeometry args={[i, longSegments, latSegments]} />
          <meshBasicMaterial color={0xffffff} wireframe />
        </mesh>
      ))
      i--;
    }

    return framesList
  }, [radius])

  return framesContent
}

export default Frames