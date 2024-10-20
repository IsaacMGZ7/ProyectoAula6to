import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import TarjetaDashboard from "../components/TarjetaDashboard";
import { deuda, pagos, transacciones, usuarios } from "../icons";
import TemplatePrincipal from "../templates/TemplatePrincipal";
import { grafico1, grafico2 } from "../helpers/opcionGrafico";
import { apiClient } from "../helpers/axiosConfig";
import { formatearPrecio } from "./../helpers/formatiarPrecio";

const DashboardAdmin = () => {
  const [obtenerDatosDashboard, setObtenerDatosDashboard] = useState({
    contarUsuarios: 0,
    totalCantidadTransacciones: 0,
    contarDineroTransacciones: 0,
    contarCantidadDeudasSinPagar: 0,
    totalDineroDeudas: 0,
    contarCantidadDeudasPagadas: 0,
    totalDineroDeudasPagadas: 0,
    listaUsuarios: [],
    cantidadesYFechasDeDeudasPorEstado: [],
    montosYFechasDeTransacciones: [],
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await apiClient.get("/dashboard/admin");

        setObtenerDatosDashboard({
          contarUsuarios: response.data.contarUsuarios,
          totalCantidadTransacciones: response.data.totalCantidadTransacciones,
          contarDineroTransacciones: response.data.contarDineroTransacciones,
          contarCantidadDeudasSinPagar:
            response.data.contarCantidadDeudasSinPagar,
          totalDineroDeudas: response.data.totalDineroDeudas,
          contarCantidadDeudasPagadas:
            response.data.contarCantidadDeudasPagadas,
          totalDineroDeudasPagadas: response.data.totalDineroDeudasPagadas,
          listaUsuarios: response.data.listaUsuarios,
          cantidadesYFechasDeDeudasPorEstado:
            response.data.cantidadesYFechasDeDeudasPorEstado,
          montosYFechasDeTransacciones:
            response.data.montosYFechasDeTransacciones,
        });
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const datosDeudas =
      obtenerDatosDashboard?.cantidadesYFechasDeDeudasPorEstado.map(
        (deuda) => ({
          x: deuda[1],
          y: deuda[0],
        })
      );

    const datosAcumulativos = [];
    let acumulado = 0;
    datosDeudas.forEach((deuda) => {
      acumulado += deuda.y;
      datosAcumulativos.push({
        x: deuda.x,
        y: acumulado,
      });
    });

    const chart = new ApexCharts(document.getElementById("column-chart"), {
      ...grafico1,
      series: [
        {
          name: "Deudas",
          color: "#1A56DB",
          data: datosDeudas,
        },
        {
          name: "Acumulado Deudas",
          color: "#FDBA8C",
          data: datosAcumulativos,
        },
      ],
    });

    chart.render();

    return () => chart.destroy();
  }, [obtenerDatosDashboard?.cantidadesYFechasDeDeudasPorEstado]);

  useEffect(() => {
    if (obtenerDatosDashboard?.montosYFechasDeTransacciones) {
      const categories = obtenerDatosDashboard.montosYFechasDeTransacciones.map(
        (transaccion) => transaccion[1].split("T")[0]
      );

      const transacciones =
        obtenerDatosDashboard.montosYFechasDeTransacciones.map(
          (transaccion) => transaccion[0]
        );

      const transaccionesAcumulativas = [];
      let acumulado = 0;

      for (let i = 0; i < transacciones.length; i++) {
        acumulado += transacciones[i];
        transaccionesAcumulativas.push(acumulado);
      }

      const chart = new ApexCharts(document.getElementById("bar-chart"), {
        ...grafico2,
        series: [
          {
            name: "Transacciones",
            data: transacciones,
          },
          {
            name: "Transacciones Acumulativas",
            data: transaccionesAcumulativas,
          },
        ],
        xaxis: {
          ...grafico2.xaxis,
          categories: categories,
        },
      });

      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [obtenerDatosDashboard?.montosYFechasDeTransacciones]);

  return (
    <TemplatePrincipal>
      <section className="pt-8 grid gap-6">
        <header className="grid grid-cols-4 gap-4">
          <TarjetaDashboard
            titulo="Total de usuarios"
            icon={usuarios}
            cantidad={`${obtenerDatosDashboard?.contarUsuarios} usuarios`}
            monto={`${obtenerDatosDashboard?.contarUsuarios}`}
          />
          <TarjetaDashboard
            titulo="Total de transacciones"
            icon={transacciones}
            cantidad={`${obtenerDatosDashboard?.totalCantidadTransacciones} transacciones`}
            monto={formatearPrecio(
              obtenerDatosDashboard?.contarDineroTransacciones
            )}
          />
          <TarjetaDashboard
            titulo="Total de deudas"
            icon={deuda}
            cantidad={`${obtenerDatosDashboard?.contarCantidadDeudasSinPagar} deudas`}
            monto={`${formatearPrecio(
              obtenerDatosDashboard?.totalDineroDeudas
            )}`}
          />
          <TarjetaDashboard
            titulo="Total de deudas pagadas"
            icon={pagos}
            cantidad={`${obtenerDatosDashboard?.contarCantidadDeudasPagadas} deudas pagadas`}
            monto={`${formatearPrecio(
              obtenerDatosDashboard?.totalDineroDeudasPagadas
            )}`}
          />
        </header>

        <article className="w-full grid grid-cols-5 gap-4 items-start pb-4">
          <div className="w-full h-full col-span-2 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                  <svg
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 19"
                  >
                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                    Deudas
                  </h5>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Actividad de los usuarios manejando deudas en el tiempo
                  </p>
                </div>
              </div>
            </div>

            <div id="column-chart"></div>
          </div>

          <div className="w-full col-span-3 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
              <dl>
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                  Cantidad total
                </dt>
                <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                  {formatearPrecio(
                    obtenerDatosDashboard?.contarDineroTransacciones
                  )}
                </dd>
              </dl>
            </div>

            <div id="bar-chart"></div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Usuarios registrados
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Estos son los usuarios que han registrado en la plataforma, se
                  muestra su información básica, pronto se podrá ver más
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Celular
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cedula
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha Registro
                  </th>
                </tr>
              </thead>
              <tbody>
                {obtenerDatosDashboard.listaUsuarios.map((usuario) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={usuario.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {usuario.nombreCompleto}
                    </th>
                    <td className="px-6 py-4">{usuario.numeroCelular}</td>
                    <td className="px-6 py-4">{usuario.cedula}</td>
                    <td className="px-6 py-4">{usuario.correo}</td>
                    <td className="px-6 py-4">{usuario.fechaRegistro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </TemplatePrincipal>
  );
};

export default DashboardAdmin;
