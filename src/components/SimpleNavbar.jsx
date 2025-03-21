import { Link } from "react-router-dom";

const SimpleNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-4 z-50 flex flex-col sm:flex-row justify-center gap-4">
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Inicio
      </Link>
      <Link to="/about" className="px-4 py-2 bg-blue-500 text-white rounded">
        ¿Cómo llegar?
      </Link>
      <Link to="/go" className="px-4 py-2 bg-blue-500 text-white rounded">
        Confirmar
      </Link>
    </div>
  );
};

export default SimpleNav;