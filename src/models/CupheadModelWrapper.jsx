"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei"
import CupheadModel from "./CupheadModel"

// Componente de carga para mostrar mientras se carga el modelo
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-bold text-white">{progress.toFixed(0)}% cargado</p>
      </div>
    </Html>
  )
}

const CupheadModelWrapper = () => {
  const [isRotating, setIsRotating] = useState(false)

  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["#111"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
      <Suspense fallback={<Loader />}>
        <CupheadModel position={[0, -1, 0]} scale={1.0} isRotating={isRotating} setIsRotating={setIsRotating} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={!isRotating} minDistance={2} maxDistance={10} />
    </Canvas>
  )
}

export default CupheadModelWrapper

