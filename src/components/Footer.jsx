const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4 shadow-lg mt-auto">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Sección izquierda - Logo/Nombre */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-base font-bold">Fiesta de Sebastián</h3>
            <p className="text-sm sm:text-xs text-blue-100">¡Celebrando 9 años de diversión!</p>
          </div>

          {/* Sección derecha - Información de contacto */}
          <div className="text-center sm:text-right">
            <p className="text-sm sm:text-xs">¡Te esperamos!</p>
            <p className="text-xs text-blue-100 mt-1">
              © {currentYear} - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;