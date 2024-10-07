import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import DropdownMenu from './DropDownMenu.tsx'; // Importa el nuevo componente

interface HeaderProps {
  name?: string;
  profilePicture?: string;
}

const Header: React.FC<HeaderProps> = ({ name, profilePicture }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular carga de datos de usuario (puedes sustituirlo por una llamada real a la API)
    const loadUserData = () => {
      setTimeout(() => {
        setIsLoading(false); // Finalizar la carga
      }, 1000); // Simula un tiempo de espera para los datos del usuario
    };
    loadUserData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Sesión cerrada");
    localStorage.removeItem('accessToken'); // Elimina el token del localStorage
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (isLoading) {
    return null; // Mientras se cargan los datos, no se muestra nada
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="nav-menu">
          <ul></ul>
        </nav>

        {/* Mostrar saludo y foto de perfil o botones de inicio/registro */}
        <div className="auth-section">
          {name && profilePicture && name !== "estoestavencido" ? (
            <div className="profile-section" ref={dropdownRef}>
              <span className="greeting">Hola, {name}</span>
              <img
                src={profilePicture}
                alt="Perfil"
                className="profile-picture"
                onClick={toggleDropdown} // Muestra/oculta el menú
              />
              {isDropdownOpen && <DropdownMenu onLogout={handleLogout} />} {/* Menú desplegable */}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Iniciar Sesión</Link>
              <Link to="/register" className="register-btn">Regístrate</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
