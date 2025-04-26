import { Link } from "react-router-dom"
import arrow from "/arrow.svg"
import ExternalLink from "./ExternalLink" // Importamos el nuevo componente

const InfoBox = ({ text, link, btnText }) => {
  return (
    <div className="mx-5 relative flex flex-col items-center gap-3 text-white max-w-xl pt-4 pb-14 px-7 sm:text-lg sm:leading-snug text-center bg-blue-700 border rounded-lg border-blue-700 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db]">
      <p className="font-medium sm:text-xl text-center">{text}</p>

      <Link
        to={link}
        className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg inline-flex items-center text-sm absolute -bottom-5 hover:bg-blue-50 active:bg-blue-100 transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        {btnText}
        <img src={arrow || "/placeholder.svg"} className="w-3 h-3 object-contain ml-2" alt="arrow" />
      </Link>
    </div>
  )
}

const renderContent = {
  1: (
    <h1 className=" font-marker sm:text-xl sm:leading-snug text-center bg-blue-700 relative border rounded-lg border-blue-700 py-4 px-8 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db] p-6 text-white mx-5">
      Hola, soy <span className="font-semibold">Sebastian</span> 👋
      <br />🎉 !Y quiero invitarte a celebrar conmigo mi cumpleaños número 9 ¡ 
      <br /> Te espero el Sábado 24 de mayo a las 11 a.m. 🎉
    </h1>
  ),
  2:  <h1 className=" font-marker sm:text-xl sm:leading-snug text-center bg-blue-700 relative border rounded-lg border-blue-700 py-4 px-8 shadow-[0.6vmin_0.6vmin_#336cc1,1vmin_1vmin_#0092db,1vmin_1vmin_#0092db,0.65vmin_1vmin_#0092db,1vmin_0.65vmin_#0092db] p-6 text-white mx-5">"Recuerda <span className=" font-semibold">llevar ropa de cambio</span>, para nuestra aventura."</h1> ,
  3: (
    
    <ExternalLink
      className=" font-marker"
      text="¡Mira cómo es el lugar donde celebraremos mi cumpleaños!"
      url="https://www.instagram.com/granjalaclarita?igsh=MXU5d3d2N3hlaGNyeg%3D%3D"
      btnText="¿Quieres ver el lugar?"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
