import Header from "./components/Header"
import ContenidoHome from "./components/ContenidoHome";
import Soporte from "./components/Soporte";

const Home = () => {
    return (
        
      <div>
      <Header name="estoestavencid" profilePicture="logo.png" />
      <ContenidoHome></ContenidoHome>
        <Soporte></Soporte>
      </div>
    );
  };
  
  export default Home;
  