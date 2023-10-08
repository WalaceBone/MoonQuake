import { useMemo } from 'react'
import { Vector3 } from 'three';
import DirectionalVector from './Lines';
const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 colorA;
    uniform vec3 colorB;
    void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.x), 1.0);
    }
`;

export interface RandomSphereProps {
  sphereRadius?: number
}

export const RandomSphere = ({ sphereRadius = 10 }: RandomSphereProps): JSX.Element => {
  const theta = Math.random() * Math.PI;
  const phi = Math.random() * 2 * Math.PI;
  const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
  const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
  const z = sphereRadius * Math.cos(theta) * Math.sin(phi);
  
  return (
    <mesh position={new Vector3(x, y, z)}>
      <sphereGeometry args={[Math.random(), 32, 32]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{
        colorA: { value: new Vector3(1, 0, 0) },
        colorB: { value: new Vector3(1, 0, 0) }
      }} />
      <DirectionalVector long={y} lat={x} az={z} />
    </mesh>
  )
}

export interface RandomSpheresProps {
  spheresCount?: number
}

export const RandomSpheres = ({ spheresCount = 100 }: RandomSpheresProps): JSX.Element[] => {
  const spheresContent = useMemo(() => {
    const spheresList = []
    for (let i = 0; i < spheresCount; i++) {
      spheresList.push(<RandomSphere key={`random-spheres-${i}`} />)
    }

    return spheresList
  }, [spheresCount])

  return spheresContent

}

export default RandomSpheres