import { Link } from 'react-router-dom';
import './Header.css'; // Archivo CSS para los estilos

const Header = () => {
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
          <ul>
            {/* Se eliminan los botones de "Inicio" y "Celebridades" en móviles */}
          
          </ul>
        </nav>

        {/* Botón de iniciar sesión o registro */}
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Iniciar Sesión</Link>
          <Link to="/register" className="register-btn">Regístrate</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
