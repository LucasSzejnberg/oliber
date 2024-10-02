import Header from "./components/Header";
import Soporte from "./components/Soporte";
import Calendario from "./components/Calendario";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="calendario-container1"> {/* Contenedor adicional para el calendario */}
                <Calendario />
            </div>
            <Soporte />
        </div>
    );
};

export default Home;
