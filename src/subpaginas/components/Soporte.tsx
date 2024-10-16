import './Soporte.css'; // Asegúrate de crear este archivo CSS también
import { useNavigate } from 'react-router-dom'; // useNavigate en lugar de useHistory

const Soporte = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para manejar la redirección
  const handleAdminRedirect = () => {
    navigate('/administrador'); // Redirige a /administrador
  };

  return (
    <footer className="soporte">
      <p className="disclaimer">
        Disclaimer: La página no se hace responsable por malas experiencias con Oliber.
      </p>
      <p className="contacto">
        Para consultas, contacta a: <a href="mailto:roguenine6@gmail.com">roguenine6@gmail.com</a>
      </p>
      <button className="boton-administrador" onClick={handleAdminRedirect}>
        Administrador
      </button>
    </footer>
  );
};

export default Soporte;
