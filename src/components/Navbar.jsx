"use client"

import { useLocation, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import cupheadMusic from "../assets/music/cuphead.mp3"

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const location = useLocation()

  // Inicializar el audio cuando el componente se monta
  useEffect(() => {
    audioRef.current = new Audio(cupheadMusic)
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Intentar reproducir automáticamente
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.warn("Reproducción automática impedida:", error)
          setIsPlaying(false)
        })
    }

    // Limpieza al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Manejar la reproducción/pausa cuando cambia isPlaying
  useEffect(() => {
    if (!audioRef.current) return

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
  }, [isPlaying])

  // Función para alternar entre reproducción y pausa
  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  // Determinar qué enlace está activo basado en la ubicación actual
  const isActive = (path) => {
    return location.pathname === path
  }

  // Añadimos un log para verificar la ubicación actual
  console.log("Current location:", location.pathname)

  // Función para manejar clics en los enlaces
  const handleLinkClick = (path) => {
    console.log(`Link clicked: ${path}`)
  }

  return (
    <header className="flex justify-between items-center sm:px-16 px-8 py-4 max-w-5xl mx-auto absolute top-0 bg-transparent z-40 right-0 left-0">
      {/* Logo y enlaces */}
      <Link
        to="/"
        onClick={() => handleLinkClick("/")}
        className={`w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md ${
          isActive("/") ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-600">Birthday</p>
      </Link>

      <nav className="flex text-lg gap-7 font-medium">
        <Link
          to="/about"
          onClick={() => handleLinkClick("/about")}
          className={`w-40 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md ${
            isActive("/about") ? "text-blue-500 ring-2 ring-blue-500" : "text-black"
          }`}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600">¿Como llegar?</p>
        </Link>

        <Link
          to="/go"
          onClick={() => handleLinkClick("/go")}
          className={`w-30 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md ${
            isActive("/go") ? "text-blue-500 ring-2 ring-blue-500" : "text-black"
          }`}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-indigo-600">Confirmar</p>
        </Link>
      </nav>

      {/* Botón de música */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label={isPlaying ? "Silenciar música" : "Reproducir música"}
          title={isPlaying ? "Silenciar música" : "Reproducir música"}
          style={{ width: "40px", height: "40px" }}
        >
          {isPlaying ? <span style={{ fontSize: "20px" }}>🔊</span> : <span style={{ fontSize: "20px" }}>🔇</span>}
        </button>
      </div>
    </header>
  )
}

export default Navbar

