import MovimientosTablaItem from "./MovimientosTablaItem";
import { PropTypes } from "prop-types";

const TablaMovimientos = ({ movimientos }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Cantidad
          </th>
          <th scope="col" className="px-6 py-3">
            Deudor
          </th>
          <th scope="col" className="px-6 py-3">
            Razón
          </th>
          <th scope="col" className="px-6 py-3">
            Fecha
          </th>
          <th scope="col" className="px-6 py-3">
            dias restantes
          </th>
          <th scope="col" className="px-6 py-3">
            Descripción
          </th>
          <th scope="col" className="px-6 py-3">
            Estado
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <>
          {movimientos.map((movimiento) => (
            <MovimientosTablaItem key={movimiento.id} movimiento={movimiento} />
          ))}
        </>
      </tbody>
    </table>
  );
};

TablaMovimientos.propTypes = {
  movimientos: PropTypes.array.isRequired,
};

export default TablaMovimientos;
