import { useRef, useCallback, useEffect } from 'react'
import { Object3D, Object3DEventMap } from "three"
import Frames from "./Frames"
import Moon from "./Moon"
import Sun from "./Sun"
import Sphere from './Sphere'

const radius = 10

const Group = (): JSX.Element => {
  const groupRef = useRef<Object3D<Object3DEventMap>>()

  const onDocumentKeydown = useCallback((e: KeyboardEvent) => {
    const moon = groupRef.current.getObjectByName('moon')

    switch (e.code) {
      case 'ArrowUp':
        moon.rotateX(0.1);
        break;
      case 'ArrowLeft':
        moon.rotateZ(-0.1);
        break;
      case 'ArrowDown':
        moon.rotateX(-0.1);
        break;
      case 'ArrowRight':
        moon.rotateZ(0.1);
        break;
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onDocumentKeydown)

    return () => {
      document.removeEventListener('keydown', onDocumentKeydown)
    }
  }, [])

  return (
    <object3D ref={groupRef}>
      <Sun />
      <Moon radius={radius} />
      <Frames radius={radius} />
      <axesHelper args={[10]} />
      <Sphere />
    </object3D>
  )
}

export default Group