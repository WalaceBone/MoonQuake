import { useFrame, type ThreeEvent, useThree } from '@react-three/fiber';
import { type JSX, useCallback, useMemo, useState, useRef } from 'react'
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Vector3 } from 'three';
import MoveCameraToTarget from '../Utils/MoveCameraToTarget';

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
  const randomSphereRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>()


  const randomSpherePosition = useMemo(() => {
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
    const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
    const z = sphereRadius * Math.cos(theta) * Math.sin(phi);
    return new Vector3(x, y, z)
  }, [])

  const [isMoving, setIsMoving] = useState(false)
  const { position: cameraPosition } = useThree((state) => state.camera)
  const cameraTarget = useMemo(() => new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z), [])
  const scale = new Vector3(0, 0, 0);

  const onDoubleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    const { eventObject: { position } } = event
    const clonedVector = position.clone()
    clonedVector.multiplyScalar(2)
    cameraTarget.set(clonedVector.x, clonedVector.y, clonedVector.z)

    setIsMoving(true)
  }, [])


  const onMovingCameraDone = useCallback(() => {
    setIsMoving(false)
  }, [])

  /* Pulsating */
  useFrame(() => {
    const time = Date.now() * 0.001;
    const pulseScale = 0.5 + 0.5 * Math.sin(time * 2);
    scale.set(pulseScale, pulseScale, pulseScale)
    randomSphereRef.current.scale.copy(scale);
  })


  return (
    <mesh ref={randomSphereRef} position={randomSpherePosition} onDoubleClick={onDoubleClick}>
      {isMoving && <MoveCameraToTarget cameraTarget={cameraTarget} onDone={onMovingCameraDone} />}
      <sphereGeometry args={[Math.random(), 32, 32]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{
        colorA: { value: new Vector3(1, 0, 0) },
        colorB: { value: new Vector3(1, 0, 0) }
      }} />
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

  return spheresContent;
}

export default RandomSpheres;
