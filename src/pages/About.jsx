import { useState, Suspense, useMemo, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Mugman from "../models/Mugman";
import BackgroundImage from "../assets/images/map.jpeg";



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
  );
}

// Componente del Mapa con AdvancedMarkerElement
function MapComponent() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  
  // Coordenadas del lugar (Parque Lleras, Medellín)
  const center = useMemo(() => ({
    lat: 6.15587,
    lng: -75.56606
  }), []);

  // Configuración para cargar la API de Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["marker", "places"], // Asegúrate de incluir "marker"
    version: "beta" // Necesario para Advanced Markers
  });

  // Efecto para crear el marcador cuando el mapa esté cargado
  useEffect(() => {
    if (isLoaded && window.google && !markerRef.current && mapRef.current) {
      // Crear elemento HTML personalizado para el marcador
      const content = document.createElement("div");
      content.innerHTML = `
        <div style="
          background: #E53935;
          color: white;
          padding: 8px 12px;
          border-radius: 16px;
          font-weight: bold;
          font-family: 'Roboto', sans-serif;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ¡Evento aquí!
        </div>
      `;
      
      // Crear el Advanced Marker
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
        content: content,
        title: "Ubicación del Evento"
      });
    }
    
    // Limpieza al desmontar el componente
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }
    };
  }, [isLoaded, center]);

  // Estilo del contenedor del mapa
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const API_KEY=import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Opciones del mapa (IMPORTANTE: incluir mapId)
  const mapOptions = {
    zoom: 17,
    center: center,
    mapId: "API_KEY",
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    disableDefaultUI: false
  };

  // Manejo de errores
  if (loadError) {
    return (
      <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-600 p-4 rounded">
        Error al cargar el mapa. Por favor, verifica:
        <ul className="list-disc pl-5 mt-2">
          <li>Tu conexión a internet</li>
          <li>Que la clave de API sea válida</li>
          <li>Que tengas habilitado "Maps JavaScript API"</li>
          <li>Que hayas creado un Map ID en Google Cloud Console</li>
        </ul>
      </div>
    );
  }

  // Estado de carga
  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-2 bg-gray-300 rounded-full mb-2"></div>
          <p>Cargando mapa...</p>
        </div>
      </div>
    );
  }

  // Renderizado del mapa
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={(map) => {
        mapRef.current = map;
        if (markerRef.current) {
          markerRef.current.map = map;
        }
      }}
      onUnmount={() => {
        mapRef.current = null;
      }}
    />
  );
}

// Componente Principal About
const About = () => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
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
      <div className="relative z-10 flex flex-col-reverse lg:flex-row w-full min-h-screen">
        {/* Sección izquierda - Información */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="bg-black opacity-75 p-8 rounded-lg text-white">
            <h1 className="text-4xl font-bold mb-6">¿Cómo llegar?</h1>

            <div className="space-y-6">
              <p className="text-lg">Aquí encontrarás información sobre cómo llegar a la fiesta.</p>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
                <p className="text-lg">Parque Lleras, El Poblado</p>
                <p className="text-lg">Medellín, Antioquia, Colombia</p>
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
                <p className="text-sm mt-2 text-gray-300">
                  Ubicación exacta del evento en Parque Lleras, Medellín.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Modelo 3D */}
        <div className="lg:w-1/2 h-[400px] lg:h-screen">
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: "100%", height: "100%" }}
            className="mb-8 lg:mb-0"
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
            <Suspense fallback={<Loader />}>
              <Mugman 
                position={[0, -0.5, 0]} 
                scale={1.4} 
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
      </div>
    </div>
  );
};

export default About;