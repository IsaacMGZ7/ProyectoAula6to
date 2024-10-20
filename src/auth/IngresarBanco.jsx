import { Link, useNavigate } from "react-router-dom";
import TemplatePrincipal from "../templates/TemplatePrincipal";
import { useForm } from "../hooks";
import Swal from "sweetalert2";
import { apiClient } from "../helpers/axiosConfig";
import { UsuarioContexto } from "../context/UsuarioContexto";
import { useContext } from "react";

const IngresarBanco = () => {
  const { usuarioActivo, setUsuarioCuenta, setEstaLogueadoBanco } =
    useContext(UsuarioContexto);
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    telefono: "",
    contrasena: "",
  });

  const esValidoElFormulario = () => {
    const { telefono, contrasena } = formState;

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

  const onIngresar = async (e) => {
    e.preventDefault();

    if (!esValidoElFormulario()) {
      return;
    }

    try {
      const response = await apiClient.post("/cuenta/iniciar", {
        numeroTelefono: formState.telefono,
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
      Swal.fire("Error", error.response.data.mensaje, "error");
    }
  };

  return (
    <TemplatePrincipal>
      <section className="p-4 mt-4 h-[calc(100vh-7rem)] rounded-lg flex justify-center items-center">
        <div className="bg-white w-2/6 rounded-lg p-4 shadow-md grid gap-6">
          <h2 className="text-3xl font-medium text-center">
            Ingresar a tu nequi virtual
          </h2>

          <form className="grid gap-4">
            <div>
              <label
                htmlFor="telefono"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Número de teléfono
              </label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="10029393..."
                value={formState.telefono}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="contrasena"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Contraseña..."
                value={formState.contrasena}
                onChange={onInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-900"
              onClick={onIngresar}
            >
              Ingresar
            </button>

            <p className="text-end text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link
                className="text-blue-500 hover:underline dark:text-blue-400"
                to="/registro-banco"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </section>
    </TemplatePrincipal>
  );
};

export default IngresarBanco;
