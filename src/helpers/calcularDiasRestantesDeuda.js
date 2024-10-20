export const calcularDiasRestantes = (fecha) => {
  const fechaDePago = new Date(fecha);
  const hoy = new Date();
  const diferenciaEnMs = fechaDePago - hoy;
  const diasRestantes = Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));
  return diasRestantes;
};
