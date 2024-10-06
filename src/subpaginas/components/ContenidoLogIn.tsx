import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContenidoLogIn.css';

const ContenidoLogIn: React.FC = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            nombre: correo,   // Se utiliza 'nombre' en lugar de 'correo'
            password: password // Se utiliza 'password' como clave para la contraseña
        };

        try {
            const response = await fetch('https://oliver-six.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }

            const result = await response.json();
            console.log(result);

            // Guarda el accessToken en el localStorage
            if (result.accessToken) {
                localStorage.setItem('accessToken', result["accessToken"]);
                console.log("el token:",result["accessToken"]);

                console.log("guardo esto, ", localStorage.getItem('accessToken'));
            }

            // Suponiendo que el login es exitoso
            navigate('/'); // Redirige al dashboard o cualquier otra página
        } catch (error) {
            console.error('Hubo un error con el inicio de sesión:', error);
        }
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
