import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from "../Loader";

const Moon = () => {
  const moon = useGLTF('/moon/moon.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.55} />
      <pointLight intensity={10} />
      <primitive object={moon.scene} />
    </mesh>
  )
}

const MoonCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 5 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Moon />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

export default MoonCanvas;
