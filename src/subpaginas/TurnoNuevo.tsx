// TurnoNuevo.tsx
import React from 'react';
import { useFechaContext } from './components/FechaContext';
import Header from "./components/Header";
import Soporte from "./components/Soporte";

const TurnoNuevo = () => {
    const { fechaSeleccionada } = useFechaContext(); // Obtén la fecha seleccionada

    return (
        <div>
            <Header />
            <h2>Fecha seleccionada: {fechaSeleccionada ? fechaSeleccionada.toLocaleDateString() : 'No hay fecha seleccionada'}</h2>
            <Soporte />
        </div>
    );
};

export default TurnoNuevo;
