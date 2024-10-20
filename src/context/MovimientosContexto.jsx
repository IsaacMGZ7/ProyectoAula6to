import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { apiClient } from "../helpers/axiosConfig";

export const MovimientosContexto = createContext();

export const MovimientosProvider = ({ children }) => {
  const [movimientos, setMovimientos] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalDeudasRegistro, setTotalDeudasRegistro] = useState({
    totalDeudasPagadas: 0,
    totalDeudasMontoPagadas: 0,
    totalDeudasSinPagar: 0,
    totalDeudasMontoSinPagar: 0,
  });
  const [loadingMovimientos, setLoadingMovimientos] = useState(true);

  const getTotalDeudasRegistro = (listaDeudaDTO) => {
    let totalSumaTodo = 0;
    let totalDeudasPagadas = 0;
    let totalDeudasMontoPagadas = 0;
    let totalDeudasSinPagar = 0;
    let totalDeudasMontoSinPagar = 0;

    listaDeudaDTO.forEach((deuda) => {
      if (deuda.estadoDeuda === "Pagada") {
        totalDeudasPagadas += 1;
        totalDeudasMontoPagadas += deuda.cantidadPrincipal;
      } else if (deuda.estadoDeuda === "Sin pagar") {
        totalDeudasSinPagar += 1;
        totalDeudasMontoSinPagar += deuda.cantidad;
      }

      totalSumaTodo += deuda.cantidad;
    });

    setTotalDeudasRegistro({
      totalDeudasPagadas,
      totalDeudasMontoPagadas,
      totalDeudasSinPagar,
      totalDeudasMontoSinPagar,
    });

    setTotal(totalSumaTodo);
  };

  useEffect(() => {
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuario"));

    const fetchMovimientos = async () => {
      try {
        const response = await apiClient.get(
          `/deuda/usuario/${usuarioActivo?.id}`
        );

        const listaDeudaDTO = response.data.listaDeudaDTO;

        getTotalDeudasRegistro(listaDeudaDTO);

        setMovimientos(listaDeudaDTO);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMovimientos(false);
      }
    };

    fetchMovimientos();
  }, []);

  return (
    <MovimientosContexto.Provider
      value={{
        movimientos,
        total,
        setMovimientos,
        loadingMovimientos,
        totalDeudasRegistro,
        setTotal,
        getTotalDeudasRegistro,
      }}
    >
      {children}
    </MovimientosContexto.Provider>
  );
};

MovimientosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
