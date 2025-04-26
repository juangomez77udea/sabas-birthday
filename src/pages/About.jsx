import { useState, Suspense, useMemo, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Html } from "@react-three/drei"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import Mugman from "../models/Mugman"
import BackgroundImage from "../assets/images/map.jpeg"

// Componente de carga para el modelo 3D
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "100%" }} />
        </div>
        <p className="mt-2 text-sm text-white">Cargando modelo...</p>
      </div>
    </Html>
  )
}

// Componente del Mapa con AdvancedMarkerElement
function MapComponent() {
  // El resto del código del mapa permanece igual
  const mapRef = useRef( 6.046695165427712, -75.61901952883606,)
  // Removed unused markerRef to resolve the compile error
     
 
  const center = useMemo(
    () => ({
      lat: 6.046695165427712,
      lng: -75.61901952883606,
    }),
    [],
  )

  // Configuración para cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["marker", "places"],
    version: "beta",
  })

  // Estilo del contenedor del mapa
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  }

  // Opciones del mapa
  const mapOptions = {
    zoom: 17,
    center: center,
    mapId: "API_KEY",
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    disableDefaultUI: false,
  }

  // Renderizado del mapa
  return (
    <div className="w-full h-[400px] bg-gray-200">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  )
}

// Componente Principal About
const About = () => {
  const [isRotating, setIsRotating] = useState(false)

  // Coordenadas para los enlaces de navegación
  const coordinates = {
    lat: 6.046695165427712,
    lng: -75.61901952883606,
  }

  // Función para abrir Google Maps
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=driving`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Función para abrir Waze
  const openWaze = () => {
    const url = `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    // Ajustamos la altura y eliminamos cualquier margen inferior
    <div className="relative w-full min-h-[calc(100vh-120px)]" style={{ marginBottom: 0 }}>
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8)",
        }}
      />

      {/* Contenido principal con dos columnas */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row w-full">
        {/* Sección izquierda - Información */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="bg-black opacity-75 p-8 rounded-lg text-white">
            <h1 className="text-4xl font-bold mb-6">¿Cómo llegar?</h1>

            <div className="space-y-6">
              <p className="text-lg">Aquí encontrarás información sobre cómo llegar a la fiesta.</p>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Ubicación</h2>
                <p className="text-lg">Granja la Clarita</p>
                <p className="text-lg">Caldas, Antioquia, Vereda La Clara</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Transporte</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>En auto: Hay estacionamiento disponible en el lugar</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Mapa</h2>
                <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg bg-white">
                  <MapComponent />
                </div>
                <p className="text-sm mt-2 text-gray-300">Granja la Clarita</p>

                {/* Botones para Google Maps y Waze */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={openGoogleMaps}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Abrir en Google Maps
                  </button>
                  <button
                    onClick={openWaze}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Abrir en Waze
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Modelo 3D */}
        <div className="lg:w-1/2 h-[400px] lg:h-[calc(100vh-120px)]">
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: "100%", height: "100%" }}
            className="mb-0"
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
            <Suspense fallback={<Loader />}>
              <Mugman position={[0, -0.5, 0]} scale={1.4} isRotating={isRotating} setIsRotating={setIsRotating} />
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
      </div>
    </div>
  )
}

export default About
