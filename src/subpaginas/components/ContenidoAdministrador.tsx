import React, { useEffect, useState } from "react";
import './ContenidoAdministrador.css';
interface Turno {
  id: number;
  nombre: string;
  apellido: string;
  fecha: string;
  hora: string;
  motivo: string;
  descripcion: string;
  estado: string;
}

const ContenidoAdministrador: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch de los turnos
  useEffect(() => {
    const fetchTurnos = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch("https://oliver-six.vercel.app/todos_turnos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los turnos");
        }

        const data: Turno[] = (await response.json())["data"];
        setTurnos(data);
      } catch (err) {
        setError("Error al obtener los turnos");
      }
    };

    fetchTurnos();
  }, []);

  // Actualizar estado del turno
  const actualizarEstado = async (id: number, estado: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("https://oliver-six.vercel.app/actualizarestado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, estado }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      // Actualizar el estado local después de enviar el post
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === id ? { ...turno, estado } : turno
        )
      );
    } catch (error) {
      setError("Error al actualizar el estado");
    }
  };

  return (
    <div>
      <h2>Administrar Turnos</h2>
      {error && <p>{error}</p>}
      {turnos.length === 0 && <p>No hay turnos disponibles.</p>}
      {turnos.map((turno) => (
        <div key={turno.id} className="tarjeta-turno">
          <p><strong>Nombre:</strong> {turno.nombre}</p>
          <p><strong>Apellido:</strong> {turno.apellido}</p>
          <p><strong>Fecha:</strong> {turno.fecha}</p>
          <p><strong>Hora:</strong> {turno.hora}</p>
          <p><strong>Motivo:</strong> {turno.motivo}</p>
          <p><strong>Descripción:</strong> {turno.descripcion}</p>
          <p><strong>Estado:</strong> {turno.estado}</p>
          <button onClick={() => actualizarEstado(turno.id, "aprobado")}>
            Aceptar
          </button>
          <button onClick={() => actualizarEstado(turno.id, "rechazado")}>
            Rechazar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContenidoAdministrador;
