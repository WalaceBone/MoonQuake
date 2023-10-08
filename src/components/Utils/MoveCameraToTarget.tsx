import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"

interface MoveCameraToTargetProps {
  cameraTarget: Vector3
  onDone: (value: boolean) => void
}

const MoveCameraToTarget = ({ cameraTarget, onDone }: MoveCameraToTargetProps): JSX.Element => {
  useFrame(({ camera }) => {
    camera.position.lerp(cameraTarget, 0.03)
    const { x: cameraX, y: cameraY, z: cameraZ } = camera.position
    if ((cameraTarget.x - cameraX) < 0.03 && (cameraTarget.y - cameraY) < 0.03 && (cameraTarget.z - cameraZ) < 0.03) {
      onDone(false)
    }
    camera.lookAt(0, 0, 0)

    return null
  })

  return null
}

export default MoveCameraToTarget