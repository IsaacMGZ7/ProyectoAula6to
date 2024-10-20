import { formatearPrecio } from "../helpers/formatiarPrecio";
import { editar, eliminar, pagar } from "../icons";
import { PropTypes } from "prop-types";
import { AgregarModificarDeuda } from "./AgregarModificarDeuda";
import { useMovimientosTablaItem } from "../hooks";
import PagarDeuda from "./PagarDeuda";
import Modal from "react-modal";

const MovimientosTablaItem = ({ movimiento }) => {
  const {
    abrirModalDeuda,
    claseColor,
    diasRestantes,
    eliminarMovimiento,
    handleAbrirModalDeuda,
    abrirModalPagar,
    handleAbrirModalPagar,
  } = useMovimientosTablaItem({ movimiento });

  return (
    <>
      <tr
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        key={movimiento.id}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {formatearPrecio(movimiento.cantidad)}
        </th>
        <td className="px-6 py-4">{movimiento.deudor}</td>
        <td className="px-6 py-4">{movimiento.tipoDeuda}</td>
        <td className="px-6 py-4">{movimiento.fecha}</td>
        <td className={`px-6 py-4 ${claseColor}`}>
          {movimiento.estadoDeuda === "Pagada"
            ? "Pagada"
            : `${diasRestantes} días`}
        </td>
        <td className="px-6 py-4">{movimiento.descripcion}</td>
        <td className="px-6 py-4">{movimiento.estadoDeuda}</td>
        <td className="px-6 py-4">
          <figure className="flex items-center gap-3">
            {movimiento.cantidad !== 0 && (
              <img
                src={pagar}
                alt="pagar"
                className="w-6 h-6 cursor-pointer hover:w-7 hover:h-7 duration-200"
                onClick={handleAbrirModalPagar}
              />
            )}
            {movimiento.cantidad !== 0 && (
              <img
                src={editar}
                alt="editar"
                className="w-6 h-6 cursor-pointer hover:w-7 hover:h-7 duration-200"
                onClick={handleAbrirModalDeuda}
              />
            )}
            <img
              src={eliminar}
              alt="eliminar"
              className="w-6 h-6 cursor-pointer hover:w-7 hover:h-7 duration-200"
              onClick={eliminarMovimiento}
            />
          </figure>
        </td>
      </tr>

      {abrirModalDeuda && (
        <tr>
          <td colSpan="7">
            <AgregarModificarDeuda
              handleAbrirModalDeuda={handleAbrirModalDeuda}
              estasEditando
              movimiento={movimiento}
            />
          </td>
        </tr>
      )}

      {abrirModalPagar && (
        <Modal isOpen={abrirModalPagar} onRequestClose={handleAbrirModalPagar}>
          <PagarDeuda
            handleAbrirModalPagar={handleAbrirModalPagar}
            deudaAPagar={movimiento}
          />
        </Modal>
      )}
    </>
  );
};

MovimientosTablaItem.propTypes = {
  movimiento: PropTypes.object.isRequired,
};

export default MovimientosTablaItem;
