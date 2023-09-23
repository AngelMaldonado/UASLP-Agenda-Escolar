import './FormularioAdministrador.css'
import Configuraciones from "../../utils/Configuraciones";
import {Campo, TipoCampo} from "../Campo/Campo.tsx";
import Boton from "../Boton";
import {FaTimes, FaUser} from "react-icons/fa";


function FormularioAdministrador() 
{
    return (
        
        <form action={Configuraciones.apiURL + "usuarios"} method="POST" className="formulario">
    
            <body>
                <Campo id="usuario" tipoCampo={TipoCampo.Text} etiqueta="Usuario (correo)" placeholder="Usuario"/>
                <Campo id="contraseña" tipoCampo={TipoCampo.Text} etiqueta="Contraseña" placeholder="Contraseña"/>
            </body> 

            <footer>
                <button type="submit" className="boton boton-recuperar">Recuperar Contraseña</button>
                <button type="button" className="boton boton-agregar">Iniciar Sesion</button>
            </footer>

        </form>
    )
}

export default FormularioAdministrador;



