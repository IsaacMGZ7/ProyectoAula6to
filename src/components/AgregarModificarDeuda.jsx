import { PropTypes } from "prop-types";
import { useFormDeuda } from "../hooks";

export const AgregarModificarDeuda = ({
  handleAbrirModalDeuda,
  movimiento,
  estasEditando,
}) => {
  const { errors, formState, onInputChange, onSubmit } = useFormDeuda({
    handleAbrirModalDeuda,
    estasEditando,
    movimiento,
  });

  return (
    <section className="fixed top-0 z-50 w-full h-screen left-0 p-4 overflow-auto">
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 -z-10"></div>
      <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
        <article className="mb-4">
          <h2 className="text-2xl font-medium text-black mb-8">
            {estasEditando ? "Modificar deuda" : "Registrar deuda"}
          </h2>
          <form onSubmit={onSubmit} className="grid gap-2">
            <div>
              <label
                htmlFor="deudor"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Nombre de quien le debes
              </label>
              <input
                type="text"
                id="deudor"
                name="deudor"
                className="block w-full p-2.5 border rounded-md shadow-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                value={formState.deudor}
                onChange={onInputChange}
              />
              {errors.deudor && (
                <span className="text-red-500 text-sm">{errors.deudor}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="cantidad"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                className="block w-full p-2.5 border rounded-md shadow-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                value={formState.cantidad}
                onChange={onInputChange}
              />
              {errors.cantidad && (
                <span className="text-red-500 text-sm">{errors.cantidad}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="fecha"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Fecha límite
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="block w-full p-2.5 border rounded-md shadow-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                value={formState.fecha}
                onChange={onInputChange}
              />
              {errors.fecha && (
                <span className="text-red-500 text-sm">{errors.fecha}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="tipoDeuda"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Tipo de deuda
              </label>
              <select
                id="tipoDeuda"
                name="tipoDeuda"
                className="block w-full p-2.5 border rounded-md shadow-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                value={formState.tipoDeuda}
                onChange={onInputChange}
              >
                <option value="">Selecciona</option>
                <option value="Préstamo personal">Préstamo personal</option>
                <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                <option value="Hipoteca">Hipoteca</option>
                <option value="Préstamo estudiantil">
                  Préstamo estudiantil
                </option>
                <option value="Préstamo de automóvil">
                  Préstamo de automóvil
                </option>
                <option value="Facturas médicas">Facturas médicas</option>
                <option value="Préstamo comercial">Préstamo comercial</option>
                <option value="Tarjetas de tiendas">Tarjetas de tiendas</option>
                <option value="Deudas familiares o personales">
                  Deudas familiares o personales
                </option>
                <option value="Facturas de servicios públicos">
                  Facturas de servicios públicos
                </option>
                <option value="Deudas atrasadas o incobrables">
                  Deudas atrasadas o incobrables
                </option>
                <option value="Deudas fiscales">Deudas fiscales</option>
                <option value="Deudas legales">Deudas legales</option>
                <option value="Otras deudas">Otras deudas</option>
              </select>
              {errors.tipoDeuda && (
                <span className="text-red-500 text-sm">{errors.tipoDeuda}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="block w-full resize-none p-2.5 border rounded-md shadow-sm bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                value={formState.descripcion}
                onChange={onInputChange}
                rows="5"
              />
              {errors.descripcion && (
                <span className="text-red-500 text-sm">
                  {errors.descripcion}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {estasEditando ? "Actualizar" : "Registrar"}
              </button>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleAbrirModalDeuda}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};

AgregarModificarDeuda.propTypes = {
  handleAbrirModalDeuda: PropTypes.func.isRequired,
  estasEditando: PropTypes.bool,
  movimiento: PropTypes.object,
};
