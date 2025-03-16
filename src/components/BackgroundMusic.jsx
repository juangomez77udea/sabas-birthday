"use client"

import { useState, useEffect, useRef } from "react"
import cupheadMusic from "../assets/music/cuphead.mp3" // Asegúrate de que la ruta sea correcta

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(true) // Cambia a true para reproducir automáticamente
    const audioRef = useRef(null)

    // Inicializar el audio cuando el componente se monta
    useEffect(() => {
        audioRef.current = new Audio(cupheadMusic)
        audioRef.current.loop = true
        audioRef.current.volume = 0.5

        // Intentar reproducir automáticamente
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
            playPromise
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
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    // Función para alternar entre reproducción y pausa
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <button
                onClick={togglePlay}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center"
                aria-label={isPlaying ? "Silenciar música" : "Reproducir música"}
                title={isPlaying ? "Silenciar música" : "Reproducir música"}
                style={{ width: "40px", height: "40px" }}
            >
                {isPlaying ? (
                    <span 
                 
                    style={{ fontSize: "20px" }}>🔊</span>
                ) : (
                    <span style={{ fontSize: "20px" }}>🔇</span>
                )}
            </button>
        </div>
    )
}

export default BackgroundMusic