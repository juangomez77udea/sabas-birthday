"use client"

import { useState } from "react"
import BackgroundImage from "../assets/images/country.jpg"

const Goto = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState("yes")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email, attending })
    setSubmitted(true)
  }

  // Añadimos un log para verificar cuando se monta el componente
  console.log("Goto component rendered")

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ pointerEvents: "auto" }}>
      {/* Background with lower z-index */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content with higher z-index */}
      <section className="relative z-10 flex lg:flex-row flex-col max-w-5xl mx-auto sm:p-16 pb-12 pt-[120px] px-8 min-h-[calc(100vh-80px)] w-full">
        <div className="bg-white/90 p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
          <h1 className="sm:text-4xl text-3xl font-semibold mb-6 text-center font-poppins">¡Confirma tu asistencia!</h1>

          {submitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-medium text-green-600 mb-4">¡Gracias por confirmar!</h2>
              <p className="text-gray-700">Hemos recibido tu confirmación. ¡Nos vemos en la fiesta!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">¿Asistirás a la fiesta?</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Sí, asistiré</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">No podré asistir</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-indigo-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                Confirmar
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Goto

