import { Navigate, Route, Routes } from "react-router-dom";
import InicioSesion from "../auth/InicioSesion";
import Registro from "../auth/Registro";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/inicio-sesion" element={<InicioSesion />} />
      <Route path="/registro" element={<Registro />} />

      <Route path="/*" element={<Navigate to="/auth/inicio-sesion" />} />
    </Routes>
  );
};

export default AuthRoutes;
