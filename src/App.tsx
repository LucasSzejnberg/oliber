import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./subpaginas/Home.tsx";
import Turnos from "./subpaginas/Turnos.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Turnos" element={<Turnos />} />

      </Routes>
    </Router>
  );
}

export default App; // <-- Asegúrate de exportar el componente
