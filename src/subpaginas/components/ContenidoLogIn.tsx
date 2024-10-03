import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContenidoLogIn.css';

const ContenidoLogIn: React.FC = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí manejarías la lógica de inicio de sesión
        console.log({ correo, password });
        // Suponiendo que el login es exitoso
        navigate('/dashboard'); // Redirige al dashboard o cualquier otra página
    };

    return (
        <div className="login-container1">
            <form className="login-form1" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                
                <div className="form-group1">
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        id="email"
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
                    <p>¿No tienes cuenta? <span onClick={() => navigate('/register')}>Regístrate aquí</span></p>
                </div>

                <button type="submit" className="login-button1">Confirmar</button>
            </form>
        </div>
    );
};

export default ContenidoLogIn;
