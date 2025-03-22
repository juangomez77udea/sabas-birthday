/* eslint-disable no-unused-vars */
"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import modelPath from "../assets/3d/cuphead__mugman.glb";

const CupheadModel = ({ isRotating, setIsRotating, onRotationChange, ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  const { viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    },
    [setIsRotating],
  );

  const handlePointerUp = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(false);
    },
    [setIsRotating],
  );

  const handlePointerMove = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (isRotating) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = (clientX - lastX.current) / viewport.width;

        group.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;

        // Notificar el cambio de rotación
        if (onRotationChange) {
          onRotationChange(group.current.rotation.y);
        }
      }
    },
    [isRotating, viewport.width, onRotationChange],
  );

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;


      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      group.current.rotation.y += rotationSpeed.current;

      // Notificar el cambio de rotación durante la rotación continua
      if (onRotationChange) {
        onRotationChange(group.current.rotation.y);
      }
    }
  });

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={group} {...props} dispose={null}>
      <group position={[1.574, 0, -0.866]} rotation={[0, 0.008, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface36_Black_0.geometry}
          material={materials.Black}
          position={[0.02, 0.068, 0.06]}
        />
        <mesh castShadow receiveShadow geometry={nodes.polySurface26_Brown_0.geometry} material={materials.Brown} />
        <mesh castShadow receiveShadow geometry={nodes.polySurface27_Brown_0.geometry} material={materials.Brown} />
        <mesh castShadow receiveShadow geometry={nodes.polySurface27_Black_0.geometry} material={materials.Black} />
        <mesh castShadow receiveShadow geometry={nodes.polySurface28_Black_0.geometry} material={materials.Black} />
        <mesh castShadow receiveShadow geometry={nodes.polySurface29_Black_0.geometry} material={materials.Black} />
        <mesh castShadow receiveShadow geometry={nodes.polySurface33_Black_0.geometry} material={materials.Black} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.pCube14_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube17_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCube17_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder16_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder16_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder16_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder18_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder18_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder18_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder19_Skin_0.geometry} material={materials.Skin} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder20_Skin_0.geometry} material={materials.Skin} />
      <mesh castShadow receiveShadow geometry={nodes.pTorus8_Brown_0.geometry} material={materials.Brown} />
      <mesh castShadow receiveShadow geometry={nodes.pCube18_Brown_0.geometry} material={materials.Brown} />
      <mesh castShadow receiveShadow geometry={nodes.pCube18_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder21_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder21_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder21_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder23_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube19_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder24_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder25_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder25_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder25_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder26_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube193_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube193_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCube194_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pTorus19_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder31_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pTorus21_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder33_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder34_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder36_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface31_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder37_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube207_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube208_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube215_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube216_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface37_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface37_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface37_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface37_Skin_0.geometry} material={materials.Skin} />
      <mesh castShadow receiveShadow geometry={nodes.polySurface37_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCube217_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCube217_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCube217_Skin_0.geometry} material={materials.Skin} />
      <mesh castShadow receiveShadow geometry={nodes.pCube217_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder38_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder39_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder39_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder39_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder40_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder41_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder41_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder41_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder42_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder43_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder43_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder43_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder44_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder45_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder45_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder45_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder46_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder47_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder47_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder47_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder48_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder49_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder49_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder49_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder50_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder51_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder51_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder51_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder52_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder52_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder52_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder53_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder54_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder54_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder54_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder55_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder56_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder57_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder57_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder57_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder58_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder58_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder58_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder59_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder60_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder61_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder61_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder61_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder64_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder65_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder65_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder65_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder66_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder67_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder67_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder67_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder68_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder68_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder68_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder69_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder72_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder72_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder72_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder73_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder74_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder75_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder75_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder75_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder76_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder77_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder77_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder77_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder78_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder78_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder78_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder79_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder80_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder81_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder81_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder81_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder82_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder82_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder82_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder83_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder84_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder84_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder84_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder85_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder88_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder89_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder89_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder89_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder90_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder91_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder91_White_0.geometry} material={materials.White} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder91_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder92_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder92_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder92_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder93_Red_0.geometry} material={materials.material} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder93_Black_0.geometry} material={materials.Black} />
      <mesh castShadow receiveShadow geometry={nodes.pCylinder93_Blue_0.geometry} material={materials.Blue} />
      <mesh castShadow receiveShadow geometry={nodes.pCube218_Black_0.geometry} material={materials.Black} />
    </a.group>
  )
}

// Precarga del modelo para mejorar el rendimiento
useGLTF.preload(modelPath)

export default CupheadModel

