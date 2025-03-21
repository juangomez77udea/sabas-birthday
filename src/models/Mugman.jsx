/* eslint-disable no-unused-vars */
import { useRef, useEffect, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import mugManScene from "../assets/3d/mugman.glb";

const Mugman = ({ isRotating, setIsRotating, ...props }) => {
  const mugmanRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(mugManScene);

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

        mugmanRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    },
    [isRotating, viewport.width],
  );

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      mugmanRef.current.rotation.y += rotationSpeed.current;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={mugmanRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.428}>
        {nodes && materials && Object.keys(nodes).map((key) => {
          if (key.startsWith('Object_') && nodes[key].geometry) {
            const materialKey = nodes[key].material ? nodes[key].material.name : null;
            return (
              <mesh
                key={key}
                castShadow
                receiveShadow
                geometry={nodes[key].geometry}
                material={materialKey && materials[materialKey] ? materials[materialKey] : undefined}
              />
            );
          }
          return null;
        })}
      </group>
    </a.group>
  );
};

export default Mugman;

useGLTF.preload(mugManScene);