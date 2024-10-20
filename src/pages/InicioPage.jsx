import { useNavigate } from "react-router-dom";
import { inicioImg } from "../images";
import TemplatePrincipal from "../templates/TemplatePrincipal";
import { useAbrirDeuda } from "../hooks";
import { AgregarModificarDeuda } from "../components/AgregarModificarDeuda";

const InicioPage = () => {
  const { abrirModalDeuda, handleAbrirModalDeuda } = useAbrirDeuda();
  const navigate = useNavigate();

  return (
    <TemplatePrincipal>
      <section className="pt-10 grid grid-cols-2 gap-4">
        <article className="flex justify-center">
          <div className="w-[80%] flex flex-col gap-2 pt-5">
            <div>
              <h1 className="text-5xl font-medium pb-3 dark:text-white">
                Gestiona tus deudas de manera rápida, eficiente y segura, desde
                la comodidad de tu casa
              </h1>
            </div>
            <p className="text-lg pb-4 text-gray-500 dark:text-gray-400">
              Lleva un control detallado de todas tus deudas, organizándolas por
              fechas de vencimiento, montos y acreedores. Nuestra plataforma te
              permite visualizar tus pagos pendientes, recibir recordatorios
              automáticos y optimizar tus finanzas de manera práctica. Olvídate
              de las preocupaciones y mantén tu economía bajo control con
              nuestras herramientas avanzadas de seguimiento financiero.
            </p>

            <div className="w-full grid grid-cols-2 gap-2">
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleAbrirModalDeuda}
              >
                Agregar una deuda
              </button>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => navigate("/movimientos")}
              >
                Ver movimientos
              </button>
            </div>
          </div>
        </article>

        <figure>
          <img className="w-[90%]" src={inicioImg} alt="inicio img" />
        </figure>
      </section>

      {abrirModalDeuda && (
        <AgregarModificarDeuda handleAbrirModalDeuda={handleAbrirModalDeuda} />
      )}
    </TemplatePrincipal>
  );
};

export default InicioPage;
