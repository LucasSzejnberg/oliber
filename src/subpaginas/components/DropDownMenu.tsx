import React from 'react';
import './DropdownMenu.css'; // Archivo CSS para los estilos

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li><a href="/profile">Perfil</a></li>
        <li><a href="/agendados">Mis turnos</a></li>
        <li><button onClick={onLogout}>Cerrar Sesión</button></li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
