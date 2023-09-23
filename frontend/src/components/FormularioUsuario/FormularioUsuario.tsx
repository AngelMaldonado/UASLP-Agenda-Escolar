import "./FormularioUsuario.css"
import Configuraciones from "../../utils/Configuraciones";
import {Campo, TipoCampo} from "../Campo/Campo.tsx";
import Boton from "../Boton";
import {FaTimes, FaUser} from "react-icons/fa";

function FormularioUsuario() {
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
          <Campo id="nombres" tipoCampo={TipoCampo.Text} etiqueta="Nombre(s)" placeholder="Nombre"/>
          <Campo id="apellidos" tipoCampo={TipoCampo.Text} etiqueta="Apellidos" placeholder="Apellidos"/>

          //Combo Box del tipo de usuario
          <select id="tipo" name="tipo" required>
            <option value="">Seleccione el Tipo de Usuario</option>
            <option value="Secundario">Secundario</option>
            <option value="Becario">Becario</option>
          </select>

          //Combo Box de los permisos del usuario 
          <select id="permisos" name="permisos" required>
              <option value="">Seleccione los Permisos</option>
              <option value="Creacion de eventos">Creación de eventos</option>
              <option value="Modificacion de eventos">Modificación de eventos</option>
              <option value="Eliminacion de eventos">Eliminación de eventos</option>
              <option value="Modificacion de usuarios">Modificación de usuarios</option>
              <option value="Modificacion de agenda">Modificación de agenda</option>
          </select>

          <input type="email" id="email" name="email" placeholder="Correo" required/>
          <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" required/>
          <input type="password" id="recontraseña" name="recontraseña" placeholder="Confirma contraseña" required/>
      </body> 

      <footer>
        <button type="submit" className="boton boton-agregar">Agregar</button>
        <button type="button" className="boton boton-cancelar">Cancelar</button>
      </footer>
    </form>
  );
}

export default FormularioUsuario
