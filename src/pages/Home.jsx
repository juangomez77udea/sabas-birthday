"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import BackgroundImage from "../assets/images/bg-sky2.jpeg";

import CupheadModel from "../models/CupheadModel";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div
      className="w-full h-screen"
      style={{
        // backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <Suspense fallback={null}>
          
          <CupheadModel position={[0, -1, 0]} scale={0.25} isRotating={isRotating} setIsRotating={setIsRotating}/>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={!isRotating} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  );
};

export default Home;