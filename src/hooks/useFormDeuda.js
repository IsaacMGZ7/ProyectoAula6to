import { useContext, useState } from "react";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { useForm } from "./useForm";
import { apiClient } from "../helpers/axiosConfig";
import Swal from "sweetalert2";
import { MovimientosContexto } from "./../context/MovimientosContexto";

const useFormDeuda = ({ handleAbrirModalDeuda, estasEditando, movimiento }) => {
  const { movimientos, setMovimientos, getTotalDeudasRegistro } =
    useContext(MovimientosContexto);
  const { usuarioActivo } = useContext(UsuarioContexto);
  const { formState, onInputChange } = useForm({
    deudor: movimiento?.deudor || "",
    cantidad: movimiento?.cantidad || "",
    fecha: movimiento?.fecha || "",
    tipoDeuda: movimiento?.tipoDeuda || "",
    descripcion: movimiento?.descripcion || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.deudor.trim()) {
      newErrors.deudor = "El deudor es obligatorio.";
    }

    if (
      !formState.cantidad ||
      isNaN(formState.cantidad) ||
      formState.cantidad <= 0
    ) {
      newErrors.cantidad = "La cantidad debe ser un número válido.";
    }

    if (!formState.fecha) {
      newErrors.fecha = "La fecha límite es obligatoria.";
    }

    if (!formState.tipoDeuda) {
      newErrors.tipoDeuda = "El tipo de deuda es obligatorio.";
    }

    if (!formState.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const url = estasEditando
      ? `/deuda/actualizar/${movimiento.id}`
      : "/deuda/agregar";

    try {
      const response = await apiClient[estasEditando ? "put" : "post"](url, {
        deudor: formState.deudor,
        cantidad: formState.cantidad,
        fecha: formState.fecha,
        tipoDeuda: formState.tipoDeuda,
        descripcion: formState.descripcion,
        usuario: {
          id: usuarioActivo.id,
        },
      });

      if (response.data.ok) {
        Swal.fire({
          icon: "success",
          title: estasEditando ? "Deuda actualizada" : "Deuda registrada",
          text: response.data.mensaje,
        });

        let deudasActualizadas;

        if (estasEditando) {
          deudasActualizadas = movimientos.map((mov) =>
            mov.id === movimiento.id ? response.data.deudaDTO : mov
          );
        } else {
          deudasActualizadas = [...movimientos, response.data.deudaDTO];
        }

        setMovimientos(deudasActualizadas);

        getTotalDeudasRegistro(deudasActualizadas);

        handleAbrirModalDeuda();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la deuda.",
      });
    }
  };

  return {
    formState,
    onInputChange,
    errors,
    onSubmit,
  };
};

export default useFormDeuda;
