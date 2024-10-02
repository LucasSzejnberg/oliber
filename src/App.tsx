import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./subpaginas/Home.tsx";
import InicioSesion from "./subpaginas/InicioSesion.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2" element={<InicioSesion />} />

      </Routes>
    </Router>
  );
}

export default App; // <-- Asegúrate de exportar el componente
