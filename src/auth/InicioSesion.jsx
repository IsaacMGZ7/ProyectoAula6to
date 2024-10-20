import { Link } from "react-router-dom";
import { iniciarSesionImg } from "../images";
import { useForm } from "../hooks/useForm";
import { apiClient } from "../helpers/axiosConfig";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsuarioContexto } from "./../context/UsuarioContexto";

const InicioSesion = () => {
  const { setUsuarioActivo, setEstaLogueado } = useContext(UsuarioContexto);
  const { correo, contrasena, onInputChange } = useForm({
    correo: "",
    contrasena: "",
  });

  const onLogin = async () => {
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, introduce un correo válido.",
      });
      return;
    }

    if (!contrasena) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña no puede estar vacía.",
      });
      return;
    }

    try {
      const response = await apiClient.post("/usuarios/login", {
        correo,
        contrasena,
      });

      if (!response.data.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }

      sessionStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: response.data.message,
      });

      setUsuarioActivo(response.data.usuario);
      setEstaLogueado(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.mensaje,
      });
    }
  };

  return (
    <section className="grid grid-cols-2 gap-8 h-screen items-center justify-items-center overflow-hidden before:content before:w-full before:h-screen before:bg-gradient-to-r from-emerald-50 to-gray-50 before:fixed before:top-0 before:left-0 before:-z-30">
      <article className="p-8 bg-white rounded-xl shadow-lg min-w-[28rem] grid">
        <h2 className="text-4xl font-medium pb-4">Iniciar Sesión</h2>
        <form className="grid gap-4 pt-6 w-[25rem]">
          <div>
            <label
              htmlFor="Correo"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Correo
            </label>
            <input
              type="text"
              id="Correo"
              name="correo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Correo@gmail.com..."
              value={correo}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="Contrasena"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="Contrasena"
              name="contrasena"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Contraseña..."
              value={contrasena}
              onChange={onInputChange}
            />
          </div>
          <div className="pt-4">
            <button
              type="button"
              className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={onLogin}
            >
              Ingresar
            </button>
          </div>
          <div className="pt-4 flex justify-end">
            <Link
              className="bg-transparent border-none cursor-pointer text-blue-500 hover:underline"
              to="/auth/registro"
            >
              ¿Aún no te has registrado? Regístrate
            </Link>
          </div>
        </form>
      </article>
      <figure className="w-full">
        <img className="w-11/12" src={iniciarSesionImg} alt="Iniciar sesión" />
      </figure>
    </section>
  );
};

export default InicioSesion;
