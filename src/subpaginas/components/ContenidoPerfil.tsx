import React, { useState, useEffect } from 'react';
import './ContenidoPerfil.css';

const ContenidoPerfil: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState<number | ''>('');
    const [altura, setAltura] = useState<number | ''>('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [fotoUrl, setFotoUrl] = useState(''); // Guardar la URL de la foto

    useEffect(() => {
        const fetchPerfilData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const response = await fetch('https://oliver-six.vercel.app/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNombre(data.nombre || '');
                setApellido(data.apellido || '');
                setEdad(data.edad || '');
                setInstagram(data.instagram || '');
                setTiktok(data.tiktok || '');
                setAltura(data.altura || '');
                setDescripcion(data.descripcion || '');
                setFotoUrl(data.foto || 'logo.png'); // Si no hay foto, usar 'logo.png'
            }
        };

        fetchPerfilData();
    }, []);

    const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFotoPerfil(file);
        }
    };

    const handleGuardar = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Token no encontrado');
                return;
            }

            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('edad', String(edad));
            formData.append('altura', String(altura));
            formData.append('instagram', instagram);
            formData.append('tiktok', tiktok);
            formData.append('descripcion', descripcion);

            // Enviar la nueva foto o la foto actual, o 'logo.png' si no hay ninguna
            if (fotoPerfil) {
                formData.append('file', fotoPerfil);
            } else {
                //formData.append('file', fotoUrl || 'logo.png');
            }

            console.log({
                nombre,
                apellido,
                edad,
                altura,
                instagram,
                tiktok,
                descripcion,
                fotoPerfil,
                fotoUrl
            });
            console.log("Contenido del FormData:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
    

            const response = await fetch('https://oliver-six.vercel.app/perfil', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // No se debe establecer Content-Type manualmente al usar FormData
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la solicitud:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Datos guardados correctamente:', data);
            window.location.href = '/';

        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    };

    const handleCancelar = () => {
        window.location.href = '/';
        setNombre('');
        setApellido('');
        setEdad('');
        setInstagram('');
        setTiktok('');
        setFotoPerfil(null);
        setAltura('');
        setDescripcion('');
    };

    return (
        <div className="contenido-perfil3">
            <h2>Modificar Datos Personales</h2>
            <form className="perfil-form3">
                <div className="form-row3">
                    <div className="form-group3">
                        <label htmlFor="foto">Foto de Perfil:</label>
                        <input type="file" id="foto" className='negro' onChange={handleFotoChange} />
                        {fotoUrl && <img src={fotoUrl} alt="Foto de perfil actual" className="foto-actual3" />}
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
                        <label htmlFor="altura">Altura:</label>
                        <input
                            type="number"
                            id="altura"
                            value={altura}
                            onChange={(e) => setAltura(Number(e.target.value))}
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
                </div>

                <div className="form-row3">
                    <div className="form-group3">
                        <label htmlFor="tiktok">TikTok:</label>
                        <input
                            type="text"
                            id="tiktok"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
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
