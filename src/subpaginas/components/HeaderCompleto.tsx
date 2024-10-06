import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Asegúrate de que la ruta sea correcta

const HeaderCompleto: React.FC = () => {
    const [name, setName] = useState('estoestavencido');
    const [profilePicture, setProfilePicture] = useState('logo.png'); // Valor por defecto
    const token = localStorage.getItem('accessToken'); // Obtiene el token del almacenamiento local
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await fetch('https://oliver-six.vercel.app/perfil', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al obtener el perfil');
                    }

                    const result = await response.json();

                    // Extrae el nombre y apellido, y maneja la foto
                    const fullName = `${result.nombre} ${result.apellido}`;
                    setName(fullName);
                    setProfilePicture(result.foto || 'logo.png'); // Usa 'logo.png' si la foto es null
                } catch (error) {
                    console.error('Hubo un error al obtener los datos del perfil:', error);
                    navigate('/login'); // Opcional: redirige si hay un error
                }
            }
        };

        fetchData();
    }, [token, navigate]);

    return <Header name={name} profilePicture={profilePicture} />;
};

export default HeaderCompleto;
