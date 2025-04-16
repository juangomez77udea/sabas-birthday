import { createContext, useState, useEffect, useRef, useContext } from "react"
import cupheadMusic from "../assets/music/cuphead.mp3"

// Crear el contexto
export const AudioContext = createContext()

// Proveedor del contexto
export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef(null)

  // Inicializar el audio
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

  // Función para alternar reproducción/pausa
  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  return <AudioContext.Provider value={{ isPlaying, togglePlay }}>{children}</AudioContext.Provider>
}

// Hook personalizado para usar el contexto
export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio debe ser usado dentro de un AudioProvider")
  }
  return context
}
