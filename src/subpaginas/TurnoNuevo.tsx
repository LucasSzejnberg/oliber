// TurnoNuevo.tsx
import { useFechaContext } from './components/FechaContext';
import Soporte from "./components/Soporte";
import FormTurnoNuevo from './components/FormTurnoNuevo'; // Importa el nuevo componente
import HeaderCompleto from './components/HeaderCompleto';

const TurnoNuevo = () => {
    const { fechaSeleccionada } = useFechaContext(); // Obtén la fecha seleccionada

    return (
        <div>
            <HeaderCompleto />
            <FormTurnoNuevo fechaInicial={fechaSeleccionada} /> {/* Pasa la fecha seleccionada al formulario */}
            <Soporte />
        </div>
    );
};

export default TurnoNuevo;
