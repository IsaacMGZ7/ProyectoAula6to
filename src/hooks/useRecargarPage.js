import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { apiClient } from "../helpers/axiosConfig";
import { useForm } from "./useForm";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { useNavigate } from "react-router-dom";
import { formatearPrecio } from "../helpers/formatiarPrecio";

const useRecargarPage = () => {
  const navigate = useNavigate();
  const { usuarioActivo, usuarioCuenta, setUsuarioCuenta } =
    useContext(UsuarioContexto);
  const { nombre, telefono, cedula, banco, monto, onInputChange } = useForm({
    nombre: usuarioActivo.nombreCompleto,
    telefono: usuarioCuenta.numeroTelefono,
    cedula: usuarioActivo.cedula,
    banco: "",
    monto: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const onRecargar = async (e) => {
    e.preventDefault();

    if (banco.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error en el formulario",
        text: "El campo banco es obligatorio",
      });
      return;
    }

    if (monto <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error en el monto",
        text: "El monto debe ser mayor a 0",
      });
      return;
    }

    setIsModalOpen(true);
    setProgress(0);
    let intervalId;

    try {
      const response = await apiClient.put("/cuenta/actualizar", {
        monto,
        usuario: {
          id: usuarioActivo.id,
        },
      });

      intervalId = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(intervalId);
            setIsModalOpen(false);
            return 100;
          }
          return Math.min(oldProgress + 1, 100);
        });
      }, 100);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      if (response.data.ok) {
        const responseTransaccion = await apiClient.post(
          "/transaccion/agregar",
          {
            nombre,
            fecha: new Date(),
            motivo: "Recarga de cuenta",
            descripcion: `Recarga de cuenta por ${formatearPrecio(
              monto
            )} en ${banco}`,
            monto,
            banco,
            cedula,
            usuario: {
              id: usuarioActivo.id,
            },
          }
        );

        if (responseTransaccion.data.ok) {
          Swal.fire({
            icon: "success",
            title: "Recarga exitosa",
            text: response.data.mensaje,
          });

          setUsuarioCuenta({
            ...usuarioCuenta,
            monto: response.data.cuentaDTO.monto,
          });

          sessionStorage.setItem(
            "usuarioCuenta",
            JSON.stringify(response.data.cuentaDTO)
          );

          navigate("/banco");
        }
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.mensaje,
      });
      setIsModalOpen(false);
    }
  };

  return {
    nombre,
    telefono,
    cedula,
    banco,
    monto,
    onInputChange,
    isModalOpen,
    progress,
    onRecargar,
    setIsModalOpen,
  };
};

export default useRecargarPage;
