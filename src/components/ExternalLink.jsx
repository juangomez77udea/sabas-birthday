"use client"
import arrow from "/arrow.svg"

const ExternalLink = ({ text, url, btnText }) => {
  return (
    <div className="mx-5 relative flex flex-col items-center gap-3 text-white max-w-xl pt-4 pb-14 px-7 sm:text-lg sm:leading-snug text-center bg-blue-700 border rounded-lg border-blue-700 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db]">
      <p className="font-medium sm:text-xl text-center">{text}</p>

      {/* Enlace externo simple y directo */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg inline-flex items-center text-sm absolute -bottom-5 hover:bg-blue-50 active:bg-blue-100 transform hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
        style={{
          // Estilos inline para asegurar que se apliquen
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        }}
        onClick={(e) => {
          // Abrir el enlace manualmente en caso de que el comportamiento predeterminado no funcione
          e.preventDefault()
          window.open(url, "_blank", "noopener,noreferrer")
        }}
      >
        {btnText}
        <img src={arrow || "/placeholder.svg"} className="w-3 h-3 object-contain ml-2" alt="arrow" />
      </a>
    </div>
  )
}

export default ExternalLink
