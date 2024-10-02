// TurnoNuevo.tsx
import { useFechaContext } from './components/FechaContext';
import Header from "./components/Header";
import Soporte from "./components/Soporte";
import FormTurnoNuevo from './components/FormTurnoNuevo'; // Importa el nuevo componente

const TurnoNuevo = () => {
    const { fechaSeleccionada } = useFechaContext(); // Obtén la fecha seleccionada

    return (
        <div>
            <Header />
            <h2>Fecha seleccionada: {fechaSeleccionada ? fechaSeleccionada.toLocaleDateString() : 'No hay fecha seleccionada'}</h2>
            <FormTurnoNuevo fechaInicial={fechaSeleccionada} /> {/* Pasa la fecha seleccionada al formulario */}
            <Soporte />
        </div>
    );
};

export default TurnoNuevo;
