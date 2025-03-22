import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber"; // Importar Canvas
import { Environment, OrbitControls } from "@react-three/drei"; // Importar dependencias de drei
import Mugman from "../models/Mugman"; // Importar el modelo Mugman

const About = () => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold m-10">¿Cómo llegar?</h1>
      <p className="text-gray-700">Aquí encontrarás información sobre cómo llegar a la fiesta.</p>
      
      {/* Canvas para renderizar el modelo 3D */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: "100%", height: "700px" }} // Ajusta la altura según sea necesario
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Mugman
            position={[0, 0, 0]} // Ajusta la posición según sea necesario
            scale={1.4} // Ajusta la escala según sea necesario
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
  );
};

export default About;