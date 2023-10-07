import { BrowserRouter } from "react-router-dom";

import { Canvas } from '@react-three/fiber'

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Canvas camera={{ fov: 60, aspect: window.innerWidth / window.innerHeight, near: 1, far: 2000 }}>
          <object3D>
          </object3D>
        </Canvas>
      </div>
    </BrowserRouter>
  )
}

export default App;