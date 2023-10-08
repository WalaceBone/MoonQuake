import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import RandomSpheres from "./RandomSpheres";
import { Mesh, SphereGeometry, Vector3, type Object3D, type Object3DEventMap } from 'three';

const PulseGroup = (): JSX.Element => {
  const pulseRef = useRef<Object3D<Object3DEventMap>>()

  useFrame(() => {
    pulseRef.current.traverse((obj) => {
      if (obj instanceof Mesh && obj.geometry instanceof SphereGeometry) {
        const time = Date.now() * 0.001;
        const pulseScale = 0.5 + 0.5 * Math.sin(time * 2);
        const scale = new Vector3(pulseScale, pulseScale, pulseScale);
        obj.scale.copy(scale);
      }
    })
  })
  return (
    <object3D ref={pulseRef}>
      <RandomSpheres />
    </object3D>
  )
}

export default PulseGroup