import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { UsuarioProvider } from "./context/UsuarioContexto";

function App() {
  return (
    <BrowserRouter>
      <UsuarioProvider>
        <AppRouter />
      </UsuarioProvider>
    </BrowserRouter>
  );
}

export default App;
