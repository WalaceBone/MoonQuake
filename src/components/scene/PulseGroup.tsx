import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import RandomSpheres from "./RandomSpheres";
import { Mesh, SphereGeometry, Vector3, type Object3D, type Object3DEventMap } from 'three';

const PulseGroup = (): JSX.Element => {
  return (
    <object3D>
      <RandomSpheres />
    </object3D>
  )
}

export default PulseGroup