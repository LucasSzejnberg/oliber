import React, { useEffect, useState } from "react";

// Define la interfaz del tipo Turno
interface Turno {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  doctor: string;
}

const ContenidoAdministrador: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]); // Estado para almacenar los turnos
  const [error, setError] = useState<string | null>(null); // Estado para almacenar errores

  // Obtén el token de la memoria del navegador (localStorage)
  const accessToken = localStorage.getItem("accessToken");

  // Función para hacer el GET a todos_turnos con el token
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("https://oliver-six.vercel.app/todos_turnos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los turnos");
        }

        const data: Turno[] = await response.json();
        setTurnos(data); // Almacena los turnos en el estado
      } catch (err) {
        setError("Error al obtener los turnos");
      }
    };

    fetchTurnos();
  }, [accessToken]);

  // Función para actualizar el estado del turno con el token
  const actualizarEstado = async (id: number, estado: string) => {
    try {
      const response = await fetch("https://oliver-six.vercel.app/actualizarestado", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          estado: estado,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del turno");
      }

      // Actualiza el estado de los turnos después de aceptar o rechazar
      setTurnos((prevTurnos) =>
        prevTurnos.filter((turno) => turno.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Administrador de Turnos</h1>
      {error && <p>{error}</p>}
      <div>
        {turnos.length > 0 ? (
          turnos.map((turno) => (
            <div key={turno.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
              <p><strong>ID:</strong> {turno.id}</p>
              <p><strong>Paciente:</strong> {turno.paciente}</p>
              <p><strong>Fecha:</strong> {turno.fecha}</p>
              <p><strong>Hora:</strong> {turno.hora}</p>
              <p><strong>Doctor:</strong> {turno.doctor}</p>
              <button onClick={() => actualizarEstado(turno.id, "aprobado")}>Aceptar</button>
              <button onClick={() => actualizarEstado(turno.id, "rechazado")}>Rechazar</button>
            </div>
          ))
        ) : (
          <p>No hay turnos nuevos</p>
        )}
      </div>
    </div>
  );
};

export default ContenidoAdministrador;
