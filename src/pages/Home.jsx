import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CupheadModel from "../models/CupheadModel";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  // Función para manejar cambios de rotación
  const handleRotationChange = (rotationY) => {
    // Normalizar la rotación a un valor entre 0 y 2π
    const normalizedRotation = ((rotationY % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);

    // Cambiar el mensaje cada 120 grados (2π/3 radianes)
    if (normalizedRotation >= 0 && normalizedRotation < (2 * Math.PI) / 3) {
      setCurrentStage(1); // Primer mensaje
    } else if (normalizedRotation >= (2 * Math.PI) / 3 && normalizedRotation < (4 * Math.PI) / 3) {
      setCurrentStage(2); // Segundo mensaje
    } else {
      setCurrentStage(3); // Tercer mensaje
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* Contenedor del mensaje */}
      <div
        className="absolute top-28 left-0 right-0 flex items-center justify-center z-10"
        style={{ pointerEvents: "none" }}
      >
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* Canvas para el modelo 3D */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <CupheadModel
            position={[0, -1, 0]} 
            scale={0.20} 
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            onRotationChange={handleRotationChange}
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
  );
};

export default Home;