import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import CupheadModel from "../models/CupheadModel"
import HomeInfo from "../components/HomeInfo"
import animatedGif from "../assets/images/cuphed.gif"
import { useAudio } from "../context/AudioContext"

const Home = () => {
  const { isPlaying } = useAudio()
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [gifSize] = useState(200) // Tamaño inicial del GIF en px

  const handleRotationChange = (rotationY) => {
    const normalizedRotation = ((rotationY % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

    if (normalizedRotation >= 0 && normalizedRotation < (2 * Math.PI) / 3) {
      setCurrentStage(1)
    } else if (normalizedRotation >= (2 * Math.PI) / 3 && normalizedRotation < (4 * Math.PI) / 3) {
      setCurrentStage(2)
    } else {
      setCurrentStage(3)
    }
  }

  return (
    <div
      className="w-full h-[calc(100vh-60px)] relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.8)",
        marginBottom: 0,
      }}
    >
      {/* Contenedor del GIF - condicionado por isPlaying */}
      {isPlaying && (
        <div
          className="absolute bottom-4 right-4 z-10 transition-all duration-500 ease-in-out"
          style={{
            width: `${gifSize}px`,
            height: `${gifSize}px`,
            border: "2px solid white",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.3)",
            opacity: isPlaying ? 1 : 0,
            transform: isPlaying ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <img
            src={animatedGif || "/placeholder.svg"}
            alt="Animación de Cuphead"
            className="w-full h-full object-contain"
            style={{
              display: "block",
            }}
          />
        </div>
      )}

      {/* Contenedor del mensaje */}
      <div
        className="absolute top-15 left-0 right-0 flex items-center justify-center z-10"
        style={{ pointerEvents: "auto" }}
      >
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* Canvas para el modelo 3D */}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <CupheadModel
            position={[0, -1.5, 0]}
            scale={0.2}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            onRotationChange={handleRotationChange}
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={!isRotating} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  )
}

export default Home
