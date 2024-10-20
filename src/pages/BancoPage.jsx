import { useContext, useEffect, useState } from "react";
import TemplatePrincipal from "../templates/TemplatePrincipal";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { formatearPrecio } from "./../helpers/formatiarPrecio";
import { MovimientosContexto } from "./../context/MovimientosContexto";
import { Link } from "react-router-dom";
import { apiClient } from "../helpers/axiosConfig";

const BancoPage = () => {
  const { usuarioCuenta, usuarioActivo } = useContext(UsuarioContexto);
  const { movimientos, totalDeudasRegistro } = useContext(MovimientosContexto);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const getTransacciones = async () => {
      try {
        const response = await apiClient.get(
          `/transaccion/usuario/${usuarioActivo.id}`
        );

        if (response.data.ok) {
          setTransacciones(response.data.listaTransaccionesDTO);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransacciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TemplatePrincipal>
      <section className="pt-8 grid gap-6">
        <header className="flex items-center justify-between bg-[#025864] p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-white text-lg">Monto</h2>
            <p className="text-white text-2xl">
              {formatearPrecio(usuarioCuenta.monto)}
            </p>
          </div>

          <h2 className="text-white text-lg">
            Deudas totales: {movimientos.length}
          </h2>

          <Link
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            to="/recargar-banco"
          >
            Recargar
          </Link>
        </header>

        <article className="grid grid-cols-2 gap-4">
          <div className="bg-[#025864] p-4 rounded-lg text-white grid gap-2">
            <h2 className="text-3xl">Deudas actuales</h2>

            <p>
              {totalDeudasRegistro.totalDeudasSinPagar} deudas sin pagar debes
              en total <br />
              <span className="text-2xl">
                {formatearPrecio(totalDeudasRegistro.totalDeudasMontoSinPagar)}
              </span>
            </p>
          </div>
          <div className="bg-[#025864] p-4 rounded-lg text-white grid gap-2">
            <h2 className="text-3xl">Deudas pagadas</h2>
            <p>
              {totalDeudasRegistro.totalDeudasPagadas} deudas pagadas en total{" "}
              <br />
              <span className="text-2xl">
                {formatearPrecio(totalDeudasRegistro.totalDeudasMontoPagadas)}
              </span>
            </p>
          </div>
        </article>

        <div className="relative h-[32rem] overflow-x-auto shadow-md grid gap-4 bg-white p-4 sm:rounded-lg">
          <h2 className="text-2xl">Registro de transacciones</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Monto
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Banco
                </th>
                <th scope="col" className="px-6 py-3">
                  Cedula
                </th>
                <th scope="col" className="px-6 py-3">
                  Motivo
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((transacion) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={transacion.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {transacion.nombre}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatearPrecio(transacion.monto)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacion.fecha.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacion.banco}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacion.cedula}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacion.motivo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacion.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </TemplatePrincipal>
  );
};

export default BancoPage;
