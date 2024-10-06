import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContenidoLogIn.css';

const ContenidoLogIn: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState(''); // Estado para la edad
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            nombre: nombre,      // Envía el nombre por separado
            apellido: apellido,  // Envía el apellido por separado
            edad: edad,          // Incluye la edad en el post
            mail: correo,
            password: password
        };

        try {
            const response = await fetch('https://oliver-six.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const result = await response.json();
            console.log(result);
            // Suponiendo que el registro es exitoso
            navigate('/'); // Redirige a la página principal u otro destino
        } catch (error) {
            console.error('Hubo un error con el registro:', error);
        }
    };

    return (
        <div className="login-container2">
            <form className="login-form1" onSubmit={handleSubmit}>
                <h2>Registrarse</h2>
                
                <div className="form-group1">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group1">
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group1"> 
                    <label htmlFor="edad">Edad:</label> {/* Nuevo input para la edad */}
                    <input
                        type="number"
                        id="edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group1">
                    <label htmlFor="correo">Correo:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group1">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="register-redirect1">
                    <p>¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia Sesión aquí</span></p>
                </div>

                <button type="submit" className="login-button1">Confirmar</button>
            </form>
        </div>
    );
};

export default ContenidoLogIn;
