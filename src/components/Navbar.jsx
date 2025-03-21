"use client"

import { useLocation, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import cupheadMusic from "../assets/music/cuphead.mp3"

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const audioRef = useRef(null)
  const location = useLocation()

  // Inicializar el audio pero NO reproducirlo automáticamente
  useEffect(() => {
    audioRef.current = new Audio(cupheadMusic)
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    audioRef.current.load()

    // Marcar el audio como listo para reproducir
    audioRef.current.oncanplaythrough = () => {
      setAudioReady(true)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Controlar la reproducción/pausa cuando cambia isPlaying
  useEffect(() => {
    if (!audioRef.current || !audioReady) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Error al reproducir música:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, audioReady])

  // Cerrar el menú móvil cuando se cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Función para alternar reproducción/pausa
  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - visible solo en desktop */}
          <Link
            to="/"
            className={`hidden md:flex rounded-lg bg-white px-4 h-10 items-center justify-center font-bold shadow-md ${
              isActive("/") ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-600">Inicio</p>
          </Link>

          {/* Espacio vacío para centrar el menú hamburguesa en móvil */}
          <div className="md:hidden"></div>

          {/* Menú de navegación para pantallas medianas y grandes */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/about"
              className={`rounded-lg bg-white px-4 h-10 items-center justify-center flex font-bold shadow-md ${
                isActive("/about") ? "text-blue-500 ring-2 ring-blue-500" : "text-black"
              }`}
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600">
                ¿Cómo llegar?
              </p>
            </Link>

            <Link
              to="/go"
              className={`rounded-lg bg-white px-4 h-10 items-center justify-center flex font-bold shadow-md ${
                isActive("/go") ? "text-blue-500 ring-2 ring-blue-500" : "text-black"
              }`}
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600">Confirmar</p>
            </Link>
          </nav>

          {/* Botón de menú hamburguesa para móviles */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 p-2 rounded-md bg-white shadow-md"
            aria-label="Menú"
          >
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black my-1.5 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></div>
          </button>
        </div>

        {/* Menú móvil desplegable */}
        <div
          className={`fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col items-center justify-center transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="flex flex-col items-center space-y-6 text-xl">
            <Link to="/" className={`px-6 py-2 rounded-lg ${isActive("/") ? "bg-blue-100 text-blue-600" : ""}`}>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-600 font-bold">
                Inicio
              </p>
            </Link>
            <Link
              to="/about"
              className={`px-6 py-2 rounded-lg ${isActive("/about") ? "bg-blue-100 text-blue-600" : ""}`}
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600 font-bold">
                ¿Cómo llegar?
              </p>
            </Link>
            <Link to="/go" className={`px-6 py-2 rounded-lg ${isActive("/go") ? "bg-blue-100 text-blue-600" : ""}`}>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600 font-bold">
                Confirmar
              </p>
            </Link>
          </nav>
        </div>
      </div>

      {/* Botón de audio - Ahora adaptativo según el tamaño de pantalla */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg"
          aria-label={isPlaying ? "Silenciar música" : "Reproducir música"}
          title={isPlaying ? "Silenciar música" : "Reproducir música"}
          style={{ width: "48px", height: "48px" }}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5 12h3a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6a1 1 0 011-1zm7-7v14l4-4h3a1 1 0 001-1V6a1 1 0 00-1-1h-3l-4-4z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar

