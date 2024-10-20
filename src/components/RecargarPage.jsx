import { TemplatePrincipal } from "./../templates/TemplatePrincipal";
import Modal from "react-modal";
import useRecargarPage from "./../hooks/useRecargarPage";
import { formatearPrecio } from "../helpers/formatiarPrecio";

Modal.setAppElement("#root");

const RecargarPage = () => {
  const {
    banco,
    cedula,
    isModalOpen,
    monto,
    nombre,
    onInputChange,
    onRecargar,
    progress,
    telefono,
    setIsModalOpen,
  } = useRecargarPage();

  return (
    <TemplatePrincipal>
      <section className="p-4 overflow-auto h-[calc(100vh-7rem)] rounded-lg flex flex-col justify-center items-center bg-white">
        <div className="w-[50%] border p-4 rounded-lg">
          <h2 className="text-3xl pb-2 text-center font-medium text-gray-900 dark:text-white">
            Recargar tu cuenta
          </h2>

          <form className="grid gap-4" onSubmit={onRecargar}>
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
                value={nombre}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombre..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
                  value={telefono}
                  disabled
                  onChange={onInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Telefono..."
                />
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
                  disabled
                  value={cedula}
                  onChange={onInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cedula..."
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="banco"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Selecciona un banco
              </label>
              <select
                id="banco"
                name="banco"
                value={banco}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border"
              >
                <option value="" disabled>
                  Selecciona un banco...
                </option>
                <option value="bancolombia">Bancolombia</option>
                <option value="davivienda">Davivienda</option>
                <option value="bbva">BBVA Colombia</option>
                <option value="banco de bogota">Banco de Bogotá</option>
                <option value="banco popular">Banco Popular</option>
                <option value="banco de occidente">Banco de Occidente</option>
                <option value="scotiabank colpatria">
                  Scotiabank Colpatria
                </option>
                <option value="banco agrario">Banco Agrario de Colombia</option>
                <option value="itau">Banco Itaú</option>
                <option value="gnb sudameris">GNB Sudameris</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="monto"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                ¿Cuanto?
              </label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={monto}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Monto..."
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 mt-4 text-white text-sm font-medium rounded-lg focus:ring-4 focus:ring-blue-500 px-5 py-2.5"
            >
              Recargar
            </button>
          </form>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-medium">Recargando...</h2>
            <p className="mt-2">Banco: {banco}</p>
            <p>Recargando: {formatearPrecio(Number(monto))}</p>
            <div className="w-full bg-gray-200 rounded-full mt-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center">{progress}%</p>
          </div>
        </Modal>
      </section>
    </TemplatePrincipal>
  );
};

export default RecargarPage;
