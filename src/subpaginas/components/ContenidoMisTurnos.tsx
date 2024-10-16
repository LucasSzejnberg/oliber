import React, { useState, useEffect } from 'react';
import './ContenidoMisTurnos.css';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  motivo: string;
  descripcion: string;
  estado: string;
}

const ContenidoMisTurnos: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && token !== 'estoestavencido') {
        try {
          const response = await fetch('https://oliver-six.vercel.app/turnos', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTurnos(data);

          } else {
            console.error('Error en la solicitud:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
    };

    fetchTurnos();
  }, []);

  const getEstadoClase = (estado: string) => {
    switch (estado) {
      case 'rechazado':
        return 'tarjeta-reprobado';
      case 'pendiente':
        return 'tarjeta-enproceso';
      case 'confirmado':
        return 'tarjeta-aprobado';
      default:
        return '';
    }
  };

  return (
    <div className="contenedor-turnos">
      {turnos.map((turno) => (
        <div key={turno.id} className={`tarjeta ${getEstadoClase(turno.estado)}`}>
          <h2 >Fecha: {turno.fecha}</h2>
          <h4 className="disclaimer" >Hora: {turno.hora}</h4>
          <h4 className="disclaimer">Motivo: {turno.motivo}</h4>
          <h4 className="disclaimer">Descripción: {turno.descripcion}</h4>
          <h4 className="disclaimer">Estado: {turno.estado}</h4>
        </div>
      ))}
    </div>
  );
};

export default ContenidoMisTurnos;
