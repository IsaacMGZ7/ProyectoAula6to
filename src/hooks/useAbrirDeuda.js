import { useState } from "react";

const useAbrirDeuda = () => {
  const [abrirModalDeuda, setAbrirModalDeuda] = useState(false);
  const [abrirModalPagar, setAbrirModalPagar] = useState(false);

  const handleAbrirModalDeuda = () => {
    setAbrirModalDeuda(!abrirModalDeuda);
  };

  const handleAbrirModalPagar = () => {
    setAbrirModalPagar(!abrirModalPagar);
  };

  return {
    abrirModalDeuda,
    handleAbrirModalDeuda,
    abrirModalPagar,
    handleAbrirModalPagar,
  };
};

export default useAbrirDeuda;
