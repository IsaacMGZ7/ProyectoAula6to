import { PropTypes } from "prop-types";
import { formatearPrecio } from "../helpers/formatiarPrecio";
import { calcularDiasRestantes } from "../helpers/calcularDiasRestantesDeuda";
import { usePagarDeuda } from "../hooks";

const PagarDeuda = ({ handleAbrirModalPagar, deudaAPagar }) => {
  const { cargandoAbono, errors, formState, onInputChange, procesarAbono } =
    usePagarDeuda({ deudaAPagar, handleAbrirModalPagar });

  return (
    <section className="w-full h-full grid grid-cols-2 gap-3">
      <div className="border-r">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Información de la deuda a pagar
        </h2>

        <ul className="grid gap-4 pt-6">
          <li className="text-xl font-semibold text-gray-800 dark:text-white">
            Le debes:
            <br />
            <span className="text-stone-400 text-base">
              {formatearPrecio(deudaAPagar.cantidad)}
            </span>{" "}
            a{" "}
            <span className="text-stone-400 text-base">
              {deudaAPagar.deudor}
            </span>
          </li>
          <li className="text-xl font-semibold text-gray-800 dark:text-white">
            Razón de la deuda:
            <br />
            <span className="text-stone-400 text-base">
              {deudaAPagar.tipoDeuda}
            </span>
          </li>
          <li className="text-xl font-semibold text-gray-800 dark:text-white">
            Debes de pagarle el:
            <br />
            <span className="text-stone-400 text-base">
              Debes de pagarle el: {deudaAPagar.fecha}
            </span>
          </li>
          <li className="text-xl font-semibold text-gray-800 dark:text-white">
            Te restan: <br />{" "}
            <span className="text-stone-400 text-base">
              Te quedan {calcularDiasRestantes(deudaAPagar.fecha)} días para
              pagar
            </span>
          </li>
          <li className="text-xl font-semibold text-gray-800 dark:text-white">
            Más información: <br />{" "}
            <span className="text-stone-400 text-base">
              {deudaAPagar.descripcion}
            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl pb-5 font-semibold text-gray-800 dark:text-white">
          Paga tu deuda aqui
        </h2>

        <div>
          <label
            htmlFor="nombre"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre..."
            value={formState.nombre}
            onChange={onInputChange}
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Al número de teléfono
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Telefono..."
            value={formState.telefono}
            onChange={onInputChange}
          />
          {errors.telefono && (
            <span className="text-red-500 text-sm">{errors.telefono}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="cedula"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Número de cedula
          </label>
          <input
            type="number"
            id="cedula"
            name="cedula"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cedula..."
            disabled
            value={formState.cedula}
            onChange={onInputChange}
          />
          {errors.cedula && (
            <span className="text-red-500 text-sm">{errors.cedula}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="abono"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Cuanto vas a abonar
          </label>
          <input
            type="number"
            id="abono"
            name="abono"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Abono..."
            value={formState.abono}
            onChange={onInputChange}
          />
          {errors.abono && (
            <span className="text-red-500 text-sm">{errors.abono}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="telefonoBanco"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Número de telefono de tu banco
          </label>
          <input
            type="number"
            id="telefonoBanco"
            name="telefonoBanco"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Telefono de tu banco..."
            value={formState.telefonoBanco}
            onChange={onInputChange}
          />
          {errors.telefonoBanco && (
            <span className="text-red-500 text-sm">{errors.telefonoBanco}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="contrasenaBanco"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Contraseña de tu banco
          </label>
          <input
            type="password"
            id="contrasenaBanco"
            name="contrasenaBanco"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contraseña de tu banco..."
            value={formState.contrasenaBanco}
            onChange={onInputChange}
          />
          {errors.contrasenaBanco && (
            <span className="text-red-500 text-sm">
              {errors.contrasenaBanco}
            </span>
          )}
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="submit"
            className="h-11 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={procesarAbono}
          >
            <span>Pagar</span>
          </button>
          <button
            type="submit"
            className="h-11 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAbrirModalPagar}
          >
            <span>Cancelar</span>
          </button>
        </div>
      </div>

      {cargandoAbono && (
        <div
          role="status"
          className="absolute w-full h-full top-0 left-0 flex flex-col gap-2 justify-center items-center bg-black bg-opacity-50"
        >
          <svg
            aria-hidden="true"
            className="w-36 h-w-36 text-gray-200 animate-spin dark:text-gray-600 fill-stone-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="text-xl text-white">
            Estamos procesando tu abono, por favor espera...
          </span>
        </div>
      )}
    </section>
  );
};

PagarDeuda.propTypes = {
  handleAbrirModalPagar: PropTypes.func.isRequired,
  deudaAPagar: PropTypes.object.isRequired,
};

export default PagarDeuda;
