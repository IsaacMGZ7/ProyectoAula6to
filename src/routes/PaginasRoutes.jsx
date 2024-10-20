import { Navigate, Route, Routes } from "react-router-dom";
import InicioPage from "../pages/InicioPage";
import MovimientosPage from "../pages/MovimientosPage";
import DashboardAdmin from "../pages/DashboardAdmin";
import RegistrarBanco from "../auth/RegistrarBanco";
import IngresarBanco from "./../auth/IngresarBanco";
import BancoPage from "./../pages/BancoPage";
import { useContext } from "react";
import { UsuarioContexto } from "../context/UsuarioContexto";
import RecargarPage from "../components/RecargarPage";

const PaginasRoutes = () => {
  const { estaLogueadoBanco, usuarioActivo, estaLogueado } =
    useContext(UsuarioContexto);

  return (
    <Routes>
      <Route path="/" element={<InicioPage />} />
      <Route path="/movimientos" element={<MovimientosPage />} />

      <Route
        path="/registro-banco"
        element={
          estaLogueadoBanco ? <Navigate to="/banco" /> : <RegistrarBanco />
        }
      />
      <Route
        path="/iniciar-sesion-banco"
        element={
          estaLogueadoBanco ? <Navigate to="/banco" /> : <IngresarBanco />
        }
      />
      <Route
        path="/banco"
        element={
          estaLogueadoBanco ? (
            <BancoPage />
          ) : (
            <Navigate to="/iniciar-sesion-banco" />
          )
        }
      />
      <Route
        path="/recargar-banco"
        element={
          estaLogueadoBanco ? (
            <RecargarPage />
          ) : (
            <Navigate to="/iniciar-sesion-banco" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          estaLogueado && usuarioActivo.correo.includes("@admin") ? (
            <DashboardAdmin />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PaginasRoutes;
