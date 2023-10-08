import { Vector3 } from 'three';

import DirectionalVector from './Lines';
import { moon } from '../../constants';

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
  radius?: number;
  longitude?: number;
  latitude?: number;
  azymut?: number;
}

const latLngToCartesian = (latitude, longitude, radius): Vector3 => {
  const phiRad = (latitude - 90) * (Math.PI / 180);
  const thetaRad = longitude * (Math.PI / 180);

  const x = radius * Math.sin(phiRad) * Math.cos(thetaRad);
  const y = radius * Math.sin(phiRad) * Math.sin(thetaRad);
  const z = radius * Math.cos(phiRad);

  return new Vector3(x, y, z);
};

export const Sphere = ({
  radius = 0.5,
  longitude = 0,
  latitude = 0,
  azymut = 0
}: SphereProps): JSX.Element => {
  const theta = Math.random() * Math.PI;
  const phi = Math.random() * 2 * Math.PI;

  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(theta) * Math.sin(phi);

  return (
    <mesh position={latLngToCartesian(latitude, longitude, moon.radius)}>
      <sphereGeometry args={[0.2, 32, 16]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{
        colorA: { value: new Vector3(0, 0, 1) },
        colorB: { value: new Vector3(0, 0, 1) }
      }} />
      {/* <DirectionalVector long={x} lat={y} az={z} /> */}
    </mesh>
  )
};

export default Sphere