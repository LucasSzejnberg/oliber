import Soporte from "./components/Soporte";
import Calendario from "./components/Calendario";
import HeaderCompleto from "./components/HeaderCompleto";

const Home = () => {
    return (
        <div>
            <HeaderCompleto />
            <div className="calendario-container1"> {/* Contenedor adicional para el calendario */}
                <Calendario />
            </div>
            <Soporte />
        </div>
    );
};

export default Home;
