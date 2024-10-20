import { useContext } from "react";
import Swal from "sweetalert2";
import { apiClient } from "../helpers/axiosConfig";
import { useForm } from "./useForm";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { useNavigate } from "react-router-dom";

const useRegistroBanco = () => {
  const { usuarioActivo, setUsuarioCuenta, setEstaLogueadoBanco } =
    useContext(UsuarioContexto);
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    cedula: "",
    telefono: "",
    contrasena: "",
  });

  const formularioEsValido = () => {
    const { cedula, telefono, contrasena } = formState;

    // Validaciones básicas
    if (!cedula || cedula.length < 10) {
      Swal.fire("Error", "El número de cédula es inválido.", "error");
      return false;
    }

    if (!telefono || telefono.length < 10 || telefono.length > 10) {
      Swal.fire("Error", "El número de teléfono es inválido.", "error");
      return false;
    }

    if (!contrasena || contrasena.length < 6) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 6 caracteres.",
        "error"
      );
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formularioEsValido()) {
      return;
    }

    try {
      const response = await apiClient.post("/cuenta/guardar", {
        numeroTelefono: formState.telefono,
        cedula: formState.cedula,
        contrasena: formState.contrasena,
        usuario: {
          id: usuarioActivo.id,
        },
      });

      if (response.data.ok) {
        Swal.fire("Éxito", response.data.mensaje, "success");

        sessionStorage.setItem(
          "usuarioCuenta",
          JSON.stringify(response.data.cuentaDTO)
        );

        setUsuarioCuenta(response.data.cuentaDTO);
        setEstaLogueadoBanco(true);

        navigate("/banco");
      }
    } catch (error) {
      console.log(error);

      Swal.fire("Error", error.response.data.mensaje, "error");
    }
  };

  return {
    formState,
    onInputChange,
    onSubmit,
  };
};

export default useRegistroBanco;
