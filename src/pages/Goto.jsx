import { useState } from "react"
import BackgroundImage from "../assets/images/country.jpg"
import { sendEmail } from "../services/emailService"

const Goto = () => {
  // Estado para manejar múltiples asistentes
  const [attendees, setAttendees] = useState([{ id: 1, name: "", attending: "yes" }])
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Función para añadir un nuevo asistente
  const addAttendee = () => {
    setAttendees([...attendees, { id: Date.now(), name: "", attending: "yes" }])
  }

  // Función para eliminar un asistente
  const removeAttendee = (id) => {
    // No permitir eliminar si solo queda un asistente
    if (attendees.length <= 1) return
    setAttendees(attendees.filter((attendee) => attendee.id !== id))
  }

  // Función para actualizar los datos de un asistente
  const updateAttendee = (id, field, value) => {
    setAttendees(attendees.map((attendee) => (attendee.id === id ? { ...attendee, [field]: value } : attendee)))
  }

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validar que todos los asistentes tengan nombre
    const isValid = attendees.every((attendee) => attendee.name.trim() !== "")
    if (!isValid) {
      setError("Por favor, completa el nombre de todos los asistentes.")
      setIsLoading(false)
      return
    }

    try {
      // Preparar los datos para enviar
      const templateParams = {
        to_email: "juangomez88@gmail.com", // Correo destino
        from_name: "Sistema de Confirmación",
        subject: "Nueva confirmación de asistencia",
        message: `
          Nuevas confirmaciones para la fiesta:
          
          ${attendees.map((a) => `- ${a.name}: ${a.attending === "yes" ? "Asistirá" : "No asistirá"}`).join("\n")}
          
          Total: ${attendees.filter((a) => a.attending === "yes").length} asistentes confirmados.
        `,
      }

      // Enviar el correo usando el servicio
      await sendEmail(templateParams)

      // Marcar como enviado
      setSubmitted(true)
    } catch (err) {
      console.error("Error al enviar el formulario:", err)
      setError("Hubo un problema al enviar tu confirmación. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)]" style={{ pointerEvents: "auto", marginBottom: 0 }}>
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <section className="relative z-10 flex flex-col lg:flex-row max-w-5xl mx-auto sm:p-16 pb-0 pt-[60px] px-4 w-full">
        <div className="bg-white/90 opacity-85 p-8 rounded-lg shadow-xl w-full max-w-md mx-auto mb-0">
          <h1 className="sm:text-4xl text-3xl font-semibold mb-6 text-center font-poppins">¡Confirma tu asistencia!</h1>

          {submitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-medium text-green-600 mb-4">¡Gracias por confirmar!</h2>
              <p className="text-gray-700 mb-4">Hemos recibido tu confirmación. ¡Nos vemos en la fiesta!</p>
              <p className="text-gray-600">
                Total de asistentes confirmados: {attendees.filter((a) => a.attending === "yes").length}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* El resto del formulario permanece igual */}
              <div className="space-y-4">
                {attendees.map((attendee, index) => (
                  <div key={attendee.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Asistente {index + 1}</h3>
                      {attendees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAttendee(attendee.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar asistente"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor={`name-${attendee.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id={`name-${attendee.id}`}
                        value={attendee.name}
                        onChange={(e) => updateAttendee(attendee.id, "name", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">¿Asistirá a la fiesta?</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`attending-${attendee.id}`}
                            value="yes"
                            checked={attendee.attending === "yes"}
                            onChange={() => updateAttendee(attendee.id, "attending", "yes")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2">Sí, asistirá</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`attending-${attendee.id}`}
                            value="no"
                            checked={attendee.attending === "no"}
                            onChange={() => updateAttendee(attendee.id, "attending", "no")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2">No podrá asistir</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addAttendee}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Añadir otro asistente
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-yellow-400 to-indigo-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity font-medium flex items-center justify-center ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Confirmar asistencia"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Goto
