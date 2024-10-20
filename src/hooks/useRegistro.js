import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useForm } from "./useForm";
import { apiClient } from "../helpers/axiosConfig";
import { UsuarioContexto } from "./../context/UsuarioContexto";

const useRegistro = () => {
  const { setUsuarioActivo, setEstaLogueado } = useContext(UsuarioContexto);
  const {
    nombreCompleto,
    numeroCelular,
    cedula,
    correo,
    contrasena,
    onInputChange,
  } = useForm({
    nombreCompleto: "",
    numeroCelular: "",
    cedula: "",
    correo: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({
    nombreCompleto: "",
    numeroCelular: "",
    cedula: "",
    correo: "",
    contrasena: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!nombreCompleto) {
      newErrors.nombreCompleto = "El nombre completo es requerido.";
    }

    if (!numeroCelular) {
      newErrors.numeroCelular = "El número de celular es requerido.";
    } else if (numeroCelular.length !== 10) {
      newErrors.numeroCelular = "El número de celular debe tener 10 dígitos.";
    }

    if (!cedula) {
      newErrors.cedula = "La cédula es requerida.";
    } else if (cedula.length !== 10) {
      newErrors.cedula = "La cédula debe tener 10 dígitos.";
    }

    if (!correo) {
      newErrors.correo = "El correo es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      newErrors.correo = "El correo no tiene un formato válido.";
    }

    if (!contrasena) {
      newErrors.contrasena = "La contraseña es requerida.";
    } else if (contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }

    for (const error in newErrors) {
      if (newErrors[error]) {
        isValid = false;
        break;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const onRegistrarUsuario = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await apiClient.post("/usuarios/registrar", {
        nombreCompleto,
        numeroCelular,
        cedula,
        correo,
        contrasena,
      });

      if (!response.data.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }

      sessionStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: response.data.message,
      });

      setUsuarioActivo(response.data.usuario);
      setEstaLogueado(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.mensaje,
      });
    }
  };

  return {
    nombreCompleto,
    numeroCelular,
    cedula,
    correo,
    contrasena,
    onInputChange,
    onRegistrarUsuario,
    errors,
  };
};

export default useRegistro;
