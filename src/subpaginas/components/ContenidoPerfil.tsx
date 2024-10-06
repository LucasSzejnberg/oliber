import React, { useState } from 'react';
import './ContenidoPerfil.css';

const ContenidoPerfil: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState<number | ''>('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);

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
                        <input type="file" id="foto" onChange={handleFotoChange} />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                        className='creeria'
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="apellido">Apellido:</label>
                        <input
                                                className='creeria'

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
                                                className='creeria'

                            type="text"
                            id="instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                    <div className="form-group3">
                        <label htmlFor="tiktok">TikTok:</label>
                        <input
                                                className='creeria'

                            type="text"
                            id="tiktok"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-group3">
                    <button type="button" className="guardar-btn3" onClick={handleGuardar}>
                        Guardar
                    </button>
                    <button type="button" className="cancelar-btn3" onClick={handleCancelar}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContenidoPerfil;
