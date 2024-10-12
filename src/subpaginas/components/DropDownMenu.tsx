import React from 'react';
import './DropDownMenu.css'; // Archivo CSS para los estilos

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li><a href="/perfil">Perfil</a></li>
        <li><a href="/misturnos">Mis turnos</a></li>
        <li><button onClick={onLogout}>Cerrar Sesión</button></li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
