import Swal from "sweetalert2";
import useAbrirDeuda from "./useAbrirDeuda";
import { apiClient } from "../helpers/axiosConfig";
import { calcularDiasRestantes } from "../helpers/calcularDiasRestantesDeuda";
import { MovimientosContexto } from "../context/MovimientosContexto";
import { useContext } from "react";

const useMovimientosTablaItem = ({ movimiento }) => {
  const { movimientos, setMovimientos } = useContext(MovimientosContexto);
  const {
    abrirModalDeuda,
    handleAbrirModalDeuda,
    abrirModalPagar,
    handleAbrirModalPagar,
  } = useAbrirDeuda();

  const eliminarMovimiento = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no se podrá recuperar el movimiento.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!isConfirmed) return;

    try {
      const response = await apiClient.delete(`/deuda/borrar/${movimiento.id}`);

      if (response.data.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "La deuda ha sido eliminada correctamente.",
        });

        const movimientosActualizados = movimientos.filter(
          (mov) => mov.id !== movimiento.id
        );

        setMovimientos(movimientosActualizados);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar la deuda.",
      });
    }
  };

  const diasRestantes = calcularDiasRestantes(movimiento.fecha);

  let claseColor;

  if (diasRestantes < 5) {
    claseColor = "text-red-500";
  } else if (diasRestantes < 10) {
    claseColor = "text-yellow-500";
  } else {
    claseColor = "text-green-500";
  }

  return {
    abrirModalDeuda,
    handleAbrirModalDeuda,
    eliminarMovimiento,
    diasRestantes,
    claseColor,
    abrirModalPagar,
    handleAbrirModalPagar,
  };
};

export default useMovimientosTablaItem;
