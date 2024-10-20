import { Link } from "react-router-dom";
import TemplatePrincipal from "../templates/TemplatePrincipal";
import useRegistroBanco from "../hooks/useRegistroBanco";

const RegistrarBanco = () => {
  const { formState, onInputChange, onSubmit } = useRegistroBanco();

  return (
    <TemplatePrincipal>
      <section className="p-4 mt-4 h-[calc(100vh-7rem)] rounded-lg flex justify-center items-center">
        <div className="bg-white w-2/4 lg:w-2/6 rounded-lg p-4 shadow-md grid gap-6">
          <h2 className="text-3xl font-medium text-center">
            Registrate en nuestro nequi virtual
          </h2>

          <form className="grid gap-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="cedula"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Número de cédula
              </label>
              <input
                type="number"
                id="cedula"
                name="cedula"
                value={formState.cedula}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1002939323..."
              />
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Número de teléfono
              </label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                value={formState.telefono}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="3002342345..."
              />
            </div>
            <div>
              <label
                htmlFor="contrasena"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formState.contrasena}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Contraseña..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-900"
            >
              Ingresar
            </button>

            <p className="text-end text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                className="text-blue-500 hover:underline dark:text-blue-400"
                to="/iniciar-sesion-banco"
              >
                Ingresa
              </Link>
            </p>
          </form>
        </div>
      </section>
    </TemplatePrincipal>
  );
};

export default RegistrarBanco;
