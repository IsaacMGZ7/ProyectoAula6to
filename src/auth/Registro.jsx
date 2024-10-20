import { Link } from "react-router-dom";
import { registroImg } from "../images";
import { useRegistro } from "../hooks";

const Registro = () => {
  const {
    cedula,
    contrasena,
    correo,
    errors,
    nombreCompleto,
    numeroCelular,
    onInputChange,
    onRegistrarUsuario,
  } = useRegistro();

  return (
    <section className="grid grid-cols-2 gap-8 h-screen items-center justify-items-center before:content before:w-full before:h-screen before:bg-gradient-to-r from-emerald-50 to-gray-50 before:fixed before:top-0 before:left-0 before:-z-30">
      <article className="p-8 bg-white rounded-xl shadow-lg min-w-[35rem] grid gap-3">
        <h2 className="text-4xl font-medium pb-2">Registrarse</h2>
        <form
          className="grid gap-2 pt-6 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="NombreCompleto"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Nombre completo
              </label>
              <input
                id="NombreCompleto"
                name="nombreCompleto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombre completo..."
                value={nombreCompleto}
                onChange={onInputChange}
              />
              {errors.nombreCompleto && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, snapp!</span>{" "}
                  {errors.nombreCompleto}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="NumeroCelular"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Número de celular
              </label>
              <input
                type="number"
                id="NumeroCelular"
                name="numeroCelular"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Número de celular..."
                value={numeroCelular}
                onChange={onInputChange}
              />
              {errors.numeroCelular && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, snapp!</span>{" "}
                  {errors.numeroCelular}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="Cedula"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Cedula
            </label>
            <input
              type="number"
              id="Cedula"
              name="cedula"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cedula..."
              value={cedula}
              onChange={onInputChange}
            />
            {errors.cedula && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> {errors.cedula}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Correo"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Correo
            </label>
            <input
              type="email"
              id="Correo"
              name="correo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Correo..."
              value={correo}
              onChange={onInputChange}
            />
            {errors.correo && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span> {errors.correo}
              </p>
            )}
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
            {errors.contrasena && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oh, snapp!</span>{" "}
                {errors.contrasena}
              </p>
            )}
          </div>
          <div className="pt-4">
            <button
              type="button"
              className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={onRegistrarUsuario}
            >
              Crear
            </button>
          </div>
          <div className="pt-4 flex justify-end">
            <Link
              className="bg-transparent border-none cursor-pointer text-blue-500 hover:underline"
              to="/auth/inicio-sesion"
            >
              ¿Ya tienes una cuenta? Ingresa
            </Link>
          </div>
        </form>
      </article>
      <figure className="w-full">
        <img className="w-11/12" src={registroImg} alt="Registrarse" />
      </figure>
    </section>
  );
};

export default Registro;
