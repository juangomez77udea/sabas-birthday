"use client"

/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useCallback } from "react"
import { useGLTF, useAnimations, useProgress, Html } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { a } from "@react-spring/three"

import bossScene from "../assets/3d/hilda_berg.glb"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-gray-700">{progress.toFixed(0)}% cargado</p>
      </div>
    </Html>
  )
}

const Boss = ({ isRotating, setIsRotating, ...props }) => {
  const group = useRef()
  const { gl, viewport } = useThree()

  // Cargar el modelo con manejo de errores
  // Inicializar los valores por defecto
  const { nodes, materials, animations } = useGLTF(bossScene)

  // Manejamos las animaciones de forma segura
  // Inicializar actions y mixer con valores por defecto
  const animResult = useAnimations(animations, group)
  const actions = animResult.actions || {}
  const mixer = animResult.mixer

  // Estado para controlar si se están reproduciendo animaciones
  const [animationIndex, setAnimationIndex] = useState(0)
  // Estado para controlar la visibilidad de las estrellas - MODIFICADO: Ahora siempre es true
  const [showStars, setShowStars] = useState(true)

  // Referencias para la rotación interactiva
  const lastX = useRef(0)
  const rotationSpeed = useRef(0)
  const dampingFactor = 0.95

  // Posiciones de las estrellas
  const starPositions = [
    { position: [-31.533, -2.642, 20.208], rotation: [0, 0, -0.065], scale: 0.013 },
    { position: [-31.533, 0.133, 15.276], rotation: [0, 0, 0.28], scale: 0.013 },
    { position: [-25, 5, 18], rotation: [0, 0.5, -0.1], scale: 0.015 },
    { position: [-28, -5, 22], rotation: [0, -0.3, 0.2], scale: 0.012 },
    { position: [-20, 3, 25], rotation: [0, 0.7, -0.15], scale: 0.014 },
  ]

  // Referencias para el movimiento de las estrellas - Ya no necesitamos actualizar las posiciones
  const starRefs = useRef(starPositions.map(() => ({ x: 0, y: 0, speedX: 0, speedY: 0 })))

  // Eliminamos el efecto que alterna la visibilidad de las estrellas
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowStars((prev) => !prev)
  //   }, 3000) // 3000 ms = 3 segundos
  //
  //   return () => clearInterval(interval) // Limpiar el intervalo al desmontar
  // }, [])

  // Iniciar animación al cargar el componente de forma segura
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    try {
      // Filtrar animaciones seguras (excluir las que causan errores)
      const safeAnimations = Object.keys(actions).filter(
        (name) => !name.includes("star") && !name.includes("star_parent") && typeof actions[name]?.reset === "function",
      )

      if (safeAnimations.length > 0) {
        const currentAnimation = safeAnimations[animationIndex % safeAnimations.length]
        if (actions[currentAnimation]) {
          actions[currentAnimation].reset().fadeIn(0.5).play()
          return () => {
            if (actions[currentAnimation]) {
              actions[currentAnimation].fadeOut(0.5)
            }
          }
        }
      }
    } catch (error) {
      console.warn("Error al reproducir animación:", error)
    }
  }, [animationIndex, actions])

  // Manejadores de eventos para la rotación interactiva
  const handlePointerDown = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      setIsRotating(true)
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      lastX.current = clientX
    },
    [setIsRotating],
  )

  const handlePointerUp = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      setIsRotating(false)
    },
    [setIsRotating],
  )

  const handlePointerMove = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (isRotating && group.current) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const delta = (clientX - lastX.current) / viewport.width
        group.current.rotation.y += delta * 0.01 * Math.PI
        lastX.current = clientX
        rotationSpeed.current = delta * 0.01 * Math.PI
      }
    },
    [isRotating, viewport.width],
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (!group.current) return

      if (e.key === "ArrowLeft") {
        if (!isRotating) setIsRotating(true)
        group.current.rotation.y += 0.01 * Math.PI
        rotationSpeed.current = 0.0125
      } else if (e.key === "ArrowRight") {
        if (!isRotating) setIsRotating(true)
        group.current.rotation.y -= 0.01 * Math.PI
        rotationSpeed.current = -0.0125
      } else if (e.key === " ") {
        if (actions && Object.keys(actions).length > 0) {
          const safeAnimations = Object.keys(actions).filter(
            (name) => !name.includes("star") && !name.includes("star_parent"),
          )
          if (safeAnimations.length > 0) {
            setAnimationIndex((prev) => (prev + 1) % safeAnimations.length)
          }
        }
      }
    },
    [isRotating, setIsRotating, actions],
  )

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setIsRotating(false)
      }
    },
    [setIsRotating],
  )

  // Aplicar rotación y amortiguamiento en cada frame
  useFrame(() => {
    if (!group.current) return

    if (!isRotating) {
      rotationSpeed.current *= dampingFactor
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }
      group.current.rotation.y += rotationSpeed.current
    }

    if (mixer) {
      try {
        mixer.update(0.016) // Aproximadamente 60fps
      } catch (error) {
        console.warn("Error al actualizar mixer:", error)
      }
    }
  })

  // Eliminamos la animación de movimiento aleatorio para las estrellas
  // useFrame(() => {
  //   if (!showStars || !group.current) return
  //
  //   starRefs.current.forEach((star, index) => {
  //     star.x += star.speedX
  //     star.y += star.speedY
  //
  //     // Rebotar en los límites del canvas
  //     if (Math.abs(star.x) > 5) star.speedX *= -1
  //     if (Math.abs(star.y) > 5) star.speedY *= -1
  //
  //     // Actualizar la posición de la estrella de forma segura
  //     try {
  //       const starGroup = group.current.getObjectByName(`star_parent_${index}`)
  //       if (starGroup) {
  //         starGroup.position.x = starPositions[index].position[0] + star.x
  //         starGroup.position.y = starPositions[index].position[1] + star.y
  //       }
  //     } catch (error) {
  //       // Ignorar errores de actualización de estrellas
  //     }
  //   })
  // })

  // Configurar event listeners
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerup", handlePointerUp)
    canvas.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown)
      canvas.removeEventListener("pointerup", handlePointerUp)
      canvas.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleKeyDown, handleKeyUp])

  // Función de utilidad para verificar si un nodo existe
  const nodeExists = (nodeName) => {
    return nodes && nodes[nodeName] && nodes[nodeName].geometry
  }

  // Renderizado optimizado del modelo con verificación de nodos
  return (
    <a.group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.061}>
          <group name="Root">
            {/* Luna - parte principal del modelo */}
            <group name="moon2" position={[4.782, 0, 12.34]} rotation={[3.129, 0.098, 0.001]} scale={[1.03, 1, 0.968]}>
              {[...Array(11)].map((_, i) => {
                const nodeName = `moon2_0${i > 0 ? "_" + i : ""}`
                return (
                  nodeExists(nodeName) && (
                    <mesh
                      key={`moon_${i}`}
                      castShadow
                      receiveShadow
                      geometry={nodes[nodeName]?.geometry}
                      material={materials.material}
                    />
                  )
                )
              })}
            </group>

            {/* Cuphead y su hélice */}
            {nodeExists("cuphead_0") && (
              <group name="Cuphead_parent" position={[-19.837, 0.067, 12.004]} rotation={[0.006, 0, 0]}>
                <group name="cuphead" position={[-0.024, -0.037, 0.027]} scale={0.14}>
                  {[...Array(4)].map((_, i) => {
                    const nodeName = `cuphead_0${i > 0 ? "_" + i : ""}`
                    return (
                      nodeExists(nodeName) && (
                        <mesh
                          key={`cuphead_${i}`}
                          castShadow
                          receiveShadow
                          geometry={nodes[nodeName]?.geometry}
                          material={materials.material}
                        />
                      )
                    )
                  })}
                  {nodeExists("propeller_0") && (
                    <group name="propeller" position={[6.503, 0.266, -0.191]}>
                      <mesh
                        name="propeller_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.propeller_0?.geometry}
                        material={materials.material}
                      />
                    </group>
                  )}
                </group>
              </group>
            )}

            {/* Estrellas - Ahora siempre visibles (eliminado showStars &&) */}
            {nodeExists("star_0") &&
              starPositions.map((star, index) => (
                <group
                  key={`star_${index}`}
                  name={`star_parent_${index}`}
                  position={star.position}
                  rotation={star.rotation}
                  scale={star.scale}
                >
                  <group name={`star_${index}`} position={[-32, -4, 16]} rotation={[0, 0.262, -Math.PI / 2]}>
                    <mesh
                      name="star_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.star_0?.geometry}
                      material={materials.Col_glow}
                    />
                  </group>
                </group>
              ))}
          </group>
        </group>
      </group>
    </a.group>
  )
}

// Configuración personalizada para el cargador GLTF
const modelOptions = {
  draco: false,
  meshopt: false,
  ktx2: false,
}

export default Boss

useGLTF.preload(bossScene, modelOptions)

