import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./subpaginas/Home.tsx";
import Turnos from "./subpaginas/Turnos.tsx";
import { FechaProvider } from './subpaginas/components/FechaContext';
import TurnoNuevo from './subpaginas/TurnoNuevo'; // Asegúrate de importar TurnoNuevo
import InicioSesion from "./subpaginas/InicioSesion.tsx";
import Registro from "./subpaginas/Registro.tsx";


function App() {
  return (
    <FechaProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Turnos" element={<Turnos />} />
        <Route path="/NuevoTurno" element={<TurnoNuevo />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Registro />} />

      </Routes>
    </Router>
    </FechaProvider>

  );
}

export default App; // <-- Asegúrate de exportar el componente
