import React, { useState, useEffect } from 'react';
import './ContenidoPerfil.css';

const ContenidoPerfil: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState<number | ''>('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [fotoUrl, setFotoUrl] = useState(''); // Para mostrar la URL de la foto si ya existe

    useEffect(() => {
        // Función para obtener los datos del perfil
        const fetchPerfilData = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Obtener el token de la memoria

                if (!token) {
                    console.error('Token no encontrado');
                    return;
                }

                const response = await fetch('https://oliver-six.vercel.app/perfil', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Enviar el token en los headers
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Error en la solicitud:', response.statusText);
                    return;
                }

                const data = await response.json();

                // Actualizar los estados con los datos obtenidos
                setNombre(data.nombre || '');
                setApellido(data.apellido || '');
                setEdad(data.edad || '');
                setInstagram(data.instagram || '');
                setTiktok(data.tiktok || '');
                setFotoUrl(data.foto || ''); // Si no hay foto, dejar el campo vacío o agregar una imagen por defecto
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        // Ejecutar la función cuando el componente se monta
        fetchPerfilData();
    }, []);

    const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFotoPerfil(file);
        }
    };

    const handleGuardar = () => {
        // Aquí puedes manejar el envío de datos
        console.log({ nombre, apellido, edad, instagram, tiktok, fotoPerfil });
    };

    const handleCancelar = () => {
        window.location.href = '/'; // Redirigir a la página de inicio de sesión

        // Reiniciar campos
        setNombre('');
        setApellido('');
        setEdad('');
        setInstagram('');
        setTiktok('');
        setFotoPerfil(null);
    };

    return (
        <div className="contenido-perfil3">
            <h2>Modificar Datos Personales</h2>
            <form className="perfil-form3">
                <div className="form-row3">
                    <div className="form-group3">
                        <label htmlFor="foto">Foto de Perfil:</label>
                        <input type="file" id="foto" className='negro' onChange={handleFotoChange} />
                        {fotoUrl && <img src={fotoUrl} alt="Foto de perfil actual" className="foto-actual3" />} {/* Mostrar foto actual si existe */}
                    </div>
                    <div className="form-group3">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="apellido">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-row3">
                    <div className="form-group3">
                        <label htmlFor="edad">Edad:</label>
                        <input
                            type="number"
                            id="edad"
                            value={edad}
                            onChange={(e) => setEdad(Number(e.target.value))}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="instagram">Instagram:</label>
                        <input
                            type="text"
                            id="instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="tiktok">TikTok:</label>
                        <input
                            type="text"
                            id="tiktok"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-group3">
                   
                    <button type="button" className="cancelar-btn3" onClick={handleCancelar}>
                        Cancelar
                    </button>
                    <button type="button" className="guardar-btn3" onClick={handleGuardar}>
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContenidoPerfil;
