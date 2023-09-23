import "./Styles.css"
import Configuraciones from "../../utils/Configuraciones";
import {Campo, TipoCampo} from "../Campo/Campo.tsx";
import Boton from "../Boton";
import {FaTimes, FaUser} from "react-icons/fa";

function Encabezado() {
  return (
      <form action={Configuraciones.apiURL + "usuarios"} method="POST" className="formulario">
      <header>
          <Boton
              onClick={() => {
              }}
              icono={<FaUser/>}
          />
          
          <p>Nuevo Usuario</p>

          <Boton onClick={() => {
            }} icono={<FaTimes/>}/>
       </header>

        <body>
          <div className="barra-correo-directorio">
            <span>Correo</span>
            <span>Directorio</span>
          </div>

          <div className="barra-UASLP"></div>
          <div className="barra-mini"></div>

          <div className="barra-botones">
              <a href="../FormularioUsuario/Formulario_NuevoUsuario.html" className="boton">Nuevo Usuario</a>
              <a href="#" className="boton">Agenda</a>
              <a href="#" className="boton">Más Eventos</a>
              <a href="../FormularioAdministrador/Formulario_Administrador.html" className="boton">Administración</a>
          </div>
        </body>
    </form>
  );
}

export default Encabezado;
