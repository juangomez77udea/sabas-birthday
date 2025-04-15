import { useState, Suspense, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Html } from "@react-three/drei"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import Mugman from "../models/Mugman"
import BackgroundImage from "../assets/images/map.jpeg"

// Componente de carga para mostrar el progreso
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

// Componente para el mapa de Google
function MapComponent() {
  const [, setMap] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  // Coordenadas de ejemplo - reemplaza con las coordenadas reales de la fiesta
  const center = {
    lat: 6.16720,
    lng: -75.58346,
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY", // Reemplaza con tu clave de API
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      <Marker position={center} onClick={() => setSelectedMarker(center)} />

      {selectedMarker && (
        <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
          <div className="p-2">
            <h3 className="font-bold text-gray-800">¡Fiesta de Cumpleaños!</h3>
            <p className="text-gray-600">Calle Principal #123, Colonia Centro</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">Cargando mapa...</div>
  )
}

const About = () => {
  const [isRotating, setIsRotating] = useState(false)

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8)",
        }}
      />

      {/* Contenido principal con dos secciones */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* Sección izquierda - Información */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white">
            <h1 className="text-4xl font-bold mb-6">¿Cómo llegar?</h1>

            <div className="space-y-6">
              <p className="text-lg">Aquí encontrarás información sobre cómo llegar a la fiesta.</p>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
                <p className="text-lg">Calle Principal #123, Colonia Centro</p>
                <p className="text-lg">Ciudad, Estado, CP 12345</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Transporte</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>En auto: Hay estacionamiento disponible en el lugar</li>
                  <li>En transporte público: Tomar la ruta 42 hasta la parada "Centro"</li>
                  <li>En taxi/Uber: Indicar la dirección mencionada arriba</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Mapa</h2>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <MapComponent />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Modelo 3D */}
        <div className="lg:w-1/2 h-[500px] lg:h-screen">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
            <Suspense fallback={<Loader />}>
              <Mugman position={[0, -1, 0]} scale={1.4} isRotating={isRotating} setIsRotating={setIsRotating} />
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
