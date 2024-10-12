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
      case 'reprobado':
        return 'tarjeta-reprobado';
      case 'pendiente':
        return 'tarjeta-enproceso';
      case 'aprobado':
        return 'tarjeta-aprobado';
      default:
        return '';
    }
  };

  return (
    <div className="contenedor-turnos">
      {turnos.map((turno) => (
        <div key={turno.id} className={`tarjeta ${getEstadoClase(turno.estado)}`}>
          <p className="turno-fecha">Fecha: {turno.fecha}</p>
          <p className="turno-hora">Hora: {turno.hora}</p>
          <p className="turno-motivo">Motivo: {turno.motivo}</p>
          <p className="turno-descripcion">Descripción: {turno.descripcion}</p>
          <p className="turno-estado">Estado: {turno.estado}</p>
        </div>
      ))}
    </div>
  );
};

export default ContenidoMisTurnos;
