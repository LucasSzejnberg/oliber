// Calendario.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFechaContext } from './FechaContext'; // Importa el hook de contexto
import './Calendario.css';

const Calendario: React.FC = () => {
    const navigate = useNavigate();
    const { setFechaSeleccionada } = useFechaContext(); // Obtén la función para establecer la fecha
    const [fechaActual, setFechaActual] = useState<Date>(new Date());

    const cambiarMes = (direccion: number) => {
        const nuevoMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + direccion);
        setFechaActual(nuevoMes);
    };

    const generarDiasDelMes = () => {
        const diasDelMes: JSX.Element[] = [];
        const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
        
        // Rellenar los días del mes
        for (let i = 1; i <= ultimoDiaDelMes.getDate(); i++) {
            diasDelMes.push(
                <td 
                    key={i} 
                    className="dia" 
                    onClick={() => {
                        const fechaElegida = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), i);
                        setFechaSeleccionada(fechaElegida); // Establecer la fecha seleccionada
                        navigate('/nuevoturno');
                    }}
                >
                    {i}
                </td>
            );
        }
        
        // Añadir celdas vacías para alinear los días de la semana
        const diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const celdasVacias = Array(primerDiaDelMes.getDay()).fill(<td className="dia vacio"></td>);

        // Agrupar días en semanas
        const semanas: JSX.Element[] = [];
        let diasIndex = 0;

        // Añadir una fila para los días de la semana
        semanas.push(
            <tr key="dias-de-la-semana">
                {diasDeLaSemana.map((dia, index) => (
                    <th key={index} className="dia">{dia}</th>
                ))}
            </tr>
        );

        // Crear filas para las semanas
        while (diasIndex < diasDelMes.length || (semanas.length === 1 && diasIndex === 0)) {
            const fila: JSX.Element[] = [];
            
            // Solo añadir celdas vacías en la primera fila
            if (semanas.length === 1) {
                for (let j = 0; j < 7; j++) {
                    if (j < celdasVacias.length) {
                        fila.push(celdasVacias[j]); // Celdas vacías para días que no pertenecen al mes
                    } else {
                        fila.push(diasDelMes[diasIndex]); // Días del mes
                        diasIndex++;
                    }
                }
                semanas.push(<tr key={`semana-${semanas.length}`}>{fila}</tr>);
            } else {
                // Para filas subsiguientes, solo agregar días del mes
                for (let j = 0; j < 7; j++) {
                    if (diasIndex < diasDelMes.length) {
                        fila.push(diasDelMes[diasIndex]);
                        diasIndex++;
                    } else {
                        fila.push(<td key={`vacio-${j}`} className="dia vacio"></td>); // Celdas vacías si no hay más días
                    }
                }
                semanas.push(<tr key={`semana-${semanas.length}`}>{fila}</tr>);
            }
        }

        return <tbody>{semanas}</tbody>;
    };

    return (
        <div className="calendario">
            <h2 className='subtitle1'>Agendá tu turno ya</h2>
            <div className="navegacion">
                <button className="botonescalendario" onClick={() => cambiarMes(-1)}>&lt; </button>
                <h2 className='subtitle1'>{fechaActual.toLocaleString('default', { month: 'long' })} {fechaActual.getFullYear()}</h2>
                <button className="botonescalendario" onClick={() => cambiarMes(1)}> &gt;</button>
            </div>
            <table className="tabla-calendario">
                {generarDiasDelMes()}
            </table>
        </div>
    );
};

export default Calendario;
