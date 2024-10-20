import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";

export const UsuarioContexto = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [usuarioCuenta, setUsuarioCuenta] = useState({});
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [estaLogueadoBanco, setEstaLogueadoBanco] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");

    if (usuarioGuardado) {
      setUsuarioActivo(JSON.parse(usuarioGuardado));
      setEstaLogueado(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const usuarioCuenta = sessionStorage.getItem("usuarioCuenta");

    if (usuarioCuenta) {
      setUsuarioCuenta(JSON.parse(usuarioCuenta));
      setEstaLogueadoBanco(true);
    }
  }, []);

  const actualizarUsuarioCuentaSession = (usuarioCuentaAct) => {
    sessionStorage.removeItem("usuarioCuenta");
    sessionStorage.setItem("usuarioCuenta", JSON.stringify(usuarioCuentaAct));
  };

  return (
    <UsuarioContexto.Provider
      value={{
        usuarioActivo,
        setUsuarioActivo,
        estaLogueado,
        setEstaLogueado,
        isLoading,
        usuarioCuenta,
        setUsuarioCuenta,
        estaLogueadoBanco,
        setEstaLogueadoBanco,
        actualizarUsuarioCuentaSession,
      }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
};

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
