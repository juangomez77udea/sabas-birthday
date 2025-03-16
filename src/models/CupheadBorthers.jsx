/* eslint-disable no-unused-vars */
import { useRef, useEffect, useCallback, useMemo } from "react"
import { useGLTF, LOD } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { a } from "@react-spring/three"
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import * as THREE from "three"

// Cambia esta ruta a la ubicación correcta de tu modelo
import brothersScene from "../assets/3d/cuphead__mugman.glb"

const CupheadBrothers = ({ isRotating, setIsRotating, ...props }) => {
  const group = useRef()
  const { gl, viewport } = useThree()
  const { nodes, materials } = useGLTF(brothersScene)

  // Referencias para la rotación interactiva
  const lastX = useRef(0)
  const rotationSpeed = useRef(0)
  const dampingFactor = 0.95

  // Optimización: Agrupar geometrías por material
  const optimizedGeometries = useMemo(() => {
    // Objeto para almacenar geometrías por material
    const geometriesByMaterial = {
      Black: [],
      White: [],
      Blue: [],
      Red: [],
      Skin: [],
      Brown: [],
    }

    // Función para añadir una geometría al grupo correspondiente
    const addGeometry = (geometry, material) => {
      if (!geometry) return

      // Clonar la geometría para evitar modificar la original
      const clonedGeometry = geometry.clone()

      // Si la geometría tiene una matriz de transformación, aplicarla
      if (clonedGeometry.applyMatrix4) {
        const matrix = new THREE.Matrix4()
        // Aplicar la matriz de transformación del nodo padre si existe
        if (geometry.userData && geometry.userData.parentMatrix) {
          matrix.fromArray(geometry.userData.parentMatrix)
          clonedGeometry.applyMatrix4(matrix)
        }
      }

      // Añadir la geometría al grupo correspondiente
      const materialName = material.name || "Black"
      if (geometriesByMaterial[materialName]) {
        geometriesByMaterial[materialName].push(clonedGeometry)
      } else {
        // Si el material no está en nuestro objeto, usar Black como fallback
        geometriesByMaterial["Black"].push(clonedGeometry)
      }
    }

    // Recorrer todos los nodos y agrupar geometrías por material
    Object.keys(nodes).forEach((nodeName) => {
      const node = nodes[nodeName]
      if (node.geometry && node.material) {
        // Si el nodo tiene geometría y material, añadirlo al grupo correspondiente
        addGeometry(node.geometry, node.material)
      }
    })

    // Fusionar geometrías por material
    const mergedGeometries = {}
    Object.keys(geometriesByMaterial).forEach((materialName) => {
      const geometries = geometriesByMaterial[materialName]
      if (geometries.length > 0) {
        try {
          // Intentar fusionar las geometrías
          mergedGeometries[materialName] = mergeBufferGeometries(geometries, false)
        } catch (error) {
          console.warn(`Error al fusionar geometrías para ${materialName}:`, error)
          // Si hay un error, usar la primera geometría como fallback
          mergedGeometries[materialName] = geometries[0]
        }
      }
    })

    return mergedGeometries
  }, [nodes])

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

      if (isRotating) {
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
      if (e.key === "ArrowLeft") {
        if (!isRotating) setIsRotating(true)
        group.current.rotation.y += 0.01 * Math.PI
        rotationSpeed.current = 0.0125
      } else if (e.key === "ArrowRight") {
        if (!isRotating) setIsRotating(true)
        group.current.rotation.y -= 0.01 * Math.PI
        rotationSpeed.current = -0.0125
      }
    },
    [isRotating, setIsRotating],
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
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }

      group.current.rotation.y += rotationSpeed.current
    }
  })

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

  return (
    <a.group ref={group} {...props} dispose={null}>
      {/* Nivel de detalle alto (cerca) */}
      <LOD distance={0} hysteresis={0.5}>
        <group>
          {/* Renderizar geometrías fusionadas por material */}
          {Object.keys(optimizedGeometries).map((materialName) => {
            const geometry = optimizedGeometries[materialName]
            const material = materials[materialName === "Red" ? "material" : materialName]

            if (geometry && material) {
              return <mesh key={materialName} castShadow receiveShadow geometry={geometry} material={material} />
            }
            return null
          })}
        </group>
      </LOD>

      {/* Nivel de detalle medio (distancia media) */}
      <LOD distance={10} hysteresis={0.5}>
        <group scale={1}>
          {/* Versión simplificada para distancia media */}
          {Object.keys(optimizedGeometries).map((materialName) => {
            // Filtrar solo los materiales principales para la versión de distancia media
            if (["Black", "Red", "Blue"].includes(materialName)) {
              const geometry = optimizedGeometries[materialName]
              const material = materials[materialName === "Red" ? "material" : materialName]

              if (geometry && material) {
                return <mesh key={materialName} castShadow receiveShadow geometry={geometry} material={material} />
              }
            }
            return null
          })}
        </group>
      </LOD>

      {/* Nivel de detalle bajo (lejos) */}
      <LOD distance={20}>
        <group scale={1}>
          {/* Versión muy simplificada para larga distancia */}
          {optimizedGeometries["Black"] && (
            <mesh castShadow receiveShadow geometry={optimizedGeometries["Black"]} material={materials["Black"]} />
          )}
        </group>
      </LOD>
    </a.group>
  )
}

// Configuración personalizada para el cargador GLTF
const modelOptions = {
  draco: false,
  meshopt: false,
  ktx2: false,
}

export default CupheadBrothers

// Precargar el modelo para mejorar el rendimiento con opciones personalizadas
useGLTF.preload(brothersScene, modelOptions)

