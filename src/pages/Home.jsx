import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Mugman from '../models/Mugman'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Mugman
            position={[0, 0, 0]}
            scale={1.5}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={!isRotating}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}

export default Home