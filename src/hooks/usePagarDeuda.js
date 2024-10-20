import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { useForm } from "./useForm";
import { apiClient } from "../helpers/axiosConfig";
import { MovimientosContexto } from "../context/MovimientosContexto";
import { formatearPrecio } from "../helpers/formatiarPrecio";

export const usePagarDeuda = ({ handleAbrirModalPagar, deudaAPagar }) => {
  const { movimientos, setMovimientos, getTotalDeudasRegistro } =
    useContext(MovimientosContexto);
  const {
    usuarioActivo,
    setUsuarioCuenta,
    usuarioCuenta,
    actualizarUsuarioCuentaSession,
  } = useContext(UsuarioContexto);
  const { formState, onInputChange } = useForm({
    nombre: deudaAPagar.deudor,
    telefono: "",
    cedula: usuarioActivo.cedula,
    abono: "",
    telefonoBanco: "",
    contrasenaBanco: "",
  });
  const [errors, setErrors] = useState({});
  const [cargandoAbono, setCargandoAbono] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!formState.nombre || formState.nombre.trim() === "") {
      errors.nombre = "El nombre es obligatorio";
    }
    if (!formState.telefono || formState.telefono.trim() === "") {
      errors.telefono = "El teléfono es obligatorio";
    }
    if (!formState.cedula || formState.cedula <= 0) {
      errors.cedula = "La cédula debe ser mayor que cero";
    }
    if (!formState.abono || formState.abono <= 0) {
      errors.abono = "El monto del abono debe ser mayor que cero";
    }
    if (!formState.telefonoBanco || formState.telefonoBanco.trim() === "") {
      errors.telefonoBanco = "El teléfono del banco es obligatorio";
    }
    if (!formState.contrasenaBanco || formState.contrasenaBanco.trim() === "") {
      errors.contrasenaBanco = "La contraseña del banco es obligatoria";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const iniciarSesion = async () => {
    try {
      const response = await apiClient.post("/cuenta/iniciar", {
        numeroTelefono: formState.telefonoBanco,
        contrasena: formState.contrasenaBanco,
        usuario: { id: usuarioActivo.id },
      });

      return response.data;
    } catch (error) {
      Swal.fire(
        "Error",
        "Ocurrió un error al intentar iniciar sesión en el banco, revisa tus credenciales",
        "error"
      );
      throw error;
    }
  };

  const pagarDeuda = async (deudaId, abono, usuarioId) => {
    try {
      const response = await apiClient.put(`/deuda/pagar/${deudaId}`, {
        cantidad: abono,
        usuario: { id: usuarioId },
      });
      return response.data;
    } catch (error) {
      Swal.fire(
        "Error",
        "Ocurrió un error al intentar realizar el abono",
        "error"
      );
      throw error;
    }
  };

  const actualizarCuenta = async (abono, usuarioId) => {
    try {
      const response = await apiClient.put("/cuenta/actualizar", {
        monto: Number(-abono),
        usuario: { id: usuarioId },
      });

      return response.data;
    } catch (error) {
      Swal.fire(
        "Error",
        "Ocurrió un error al intentar actualizar tu cuenta",
        "error"
      );
      throw error;
    }
  };

  const crearTransccion = async () => {
    try {
      const responseTransaccion = await apiClient.post("/transaccion/agregar", {
        nombre: formState.nombre,
        fecha: new Date(),
        motivo: deudaAPagar.tipoDeuda,
        descripcion: `Abonaste ${formatearPrecio(
          Number(formState.abono)
        )} a tu deuda de ${formatearPrecio(deudaAPagar.cantidad)}`,
        monto: formState.abono,
        banco: "Nequi virtual",
        cedula: usuarioActivo.cedula,
        usuario: {
          id: usuarioActivo.id,
        },
      });

      return responseTransaccion.data;
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.mensaje,
      });
    }
  };

  const procesarAbono = async () => {
    if (!validateForm()) {
      return;
    }

    setCargandoAbono(true);

    try {
      const inicioSesionData = await iniciarSesion();

      if (!inicioSesionData.ok) {
        return;
      }

      if (inicioSesionData.cuentaDTO.monto < formState.abono) {
        Swal.fire(
          "Error",
          "No tienes suficiente saldo en tu cuenta para realizar el abono",
          "error"
        );
        return;
      }

      if (deudaAPagar.cantidad < formState.abono) {
        Swal.fire(
          "Error",
          `El abono no puede ser mayor que la deuda, solo debes ${formatearPrecio(
            deudaAPagar.cantidad
          )} y estas enviando ${formatearPrecio(Number(formState.abono))}`,
          "error"
        );
        return;
      }

      const [pagoResponse, actualizarResponse] = await Promise.all([
        pagarDeuda(deudaAPagar.id, formState.abono, usuarioActivo.id),
        actualizarCuenta(formState.abono, usuarioActivo.id),
        crearTransccion(),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 8000));

      if (pagoResponse.ok && actualizarResponse.ok) {
        Swal.fire("Éxito", "El abono se realizó correctamente", "success");
        handleAbrirModalPagar();

        const deudaAbono = movimientos.map((mov) => {
          if (mov.id === deudaAPagar.id) {
            return {
              ...mov,
              cantidad: mov.cantidad - formState.abono,
              estadoDeuda:
                mov.cantidad - formState.abono <= 0 ? "Pagada" : "Sin pagar",
            };
          } else {
            return mov;
          }
        });

        setMovimientos(deudaAbono);

        getTotalDeudasRegistro(deudaAbono);

        const usuarioCuentaActualizada = {
          ...usuarioCuenta,
          monto: usuarioCuenta.monto - formState.abono,
        };

        setUsuarioCuenta(usuarioCuentaActualizada);

        actualizarUsuarioCuentaSession(usuarioCuentaActualizada);
      } else {
        Swal.fire(
          "Error",
          "Ocurrió un error al procesar el abono o actualizar la cuenta",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.mensaje,
      });
    } finally {
      setCargandoAbono(false);
    }
  };

  return {
    formState,
    onInputChange,
    errors,
    cargandoAbono,
    procesarAbono,
  };
};
