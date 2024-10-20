import { Link } from "react-router-dom";
import { logo } from "../images";
import { useContext } from "react";
import { UsuarioContexto } from "../context/UsuarioContexto";

const Navbar = () => {
  const {
    usuarioActivo,
    setUsuarioActivo,
    setEstaLogueado,
    setUsuarioCuenta,
    setEstaLogueadoBanco,
  } = useContext(UsuarioContexto);

  const onLogout = () => {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("usuarioCuenta");
    setUsuarioActivo({});
    setEstaLogueado(false);
    setUsuarioCuenta({});
    setEstaLogueadoBanco(false);
  };

  return (
    <nav className="flex justify-between items-center">
      <Link className="flex gap-4 items-center" to="/">
        <img className="w-20 h-20" src={logo} alt="Logo de la app" />
        <p className="text-lg font-medium">
          Gestión <br /> economica
        </p>
      </Link>

      <ul className="flex gap-10">
        {usuarioActivo.correo.includes("@admin") && (
          <li className="text-lg font-medium cursor-pointer hover:text-xl duration-200 hover:text-blue-500">
            <Link to="/dashboard">Dashboard admin</Link>
          </li>
        )}
        <li className="text-lg font-medium cursor-pointer hover:text-xl duration-200 hover:text-blue-500">
          <Link to="/">Inicio</Link>
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-xl duration-200 hover:text-blue-500">
          <Link to="/movimientos">Deudas</Link>
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-xl duration-200 hover:text-blue-500">
          <Link to="/banco">Banco</Link>
        </li>
      </ul>

      <div>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
