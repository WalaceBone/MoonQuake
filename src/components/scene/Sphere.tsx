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

export interface SphereProps {
  sphereRadius?: number
  longitude?: number
  latitude?: number
  azymut?: number

}

export const Sphere = ({ sphereRadius = 10, longitude, latitude, azymut = 0 }: SphereProps): JSX.Element => {
  const theta = Math.random() * Math.PI;
  const phi = Math.random() * 2 * Math.PI;
  const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
  const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
  const z = sphereRadius * Math.cos(theta) * Math.sin(phi);

  return (
    <mesh position={new Vector3(x, y, z)}>
      <sphereGeometry args={[Math.random(), 32, 32]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{
        colorA: { value: new Vector3(0, 0, 1) },
        colorB: { value: new Vector3(1, 0, 0) }
      }} />
      <DirectionalVector long={x} lat={y} az={z} />
    </mesh>
  )
};

export default Sphere