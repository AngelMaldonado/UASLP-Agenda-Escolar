import "./FormularioUsuario.css"
import Configuraciones from "../../utils/Configuraciones"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx";

function FormularioUsuario() {
  return (
    <form action={Configuraciones.apiURL + "usuarios"} method="POST" className="form-nuevo-usuario">
      <div>
        <Campo id="nombres" tipoCampo={TipoCampo.Texto} etiqueta="Nombre(s)" placeholder="Nombre"/>
        <Campo id="apellidos" tipoCampo={TipoCampo.Texto} etiqueta="Apellidos" placeholder="Apellidos"/>
        <Campo id="apellidos" tipoCampo={TipoCampo.Desplegable} etiqueta="Tipo de usuario" placeholder="Apellidos"/>

        {/*<div className="Campos">
          <div className="Campo">
            <label htmlFor="tipo">Tipo de usuario</label>
            <select id="tipo" name="tipo" required>
              <option value="">Seleccione el Tipo de Usuario</option>
              <option value="Secundario">Secundario</option>
              <option value="Becario">Becario</option>
            </select>
          </div>

          <div className="Campo">
            <label htmlFor="permisos">Permisos</label>
            <select id="permisos" name="permisos" required>
              <option value="">Seleccione los Permisos</option>
              <option value="Creacion de eventos">Creación de eventos</option>
              <option value="Modificacion de eventos">Modificación de eventos</option>
              <option value="Eliminacion de eventos">Eliminación de eventos</option>
              <option value="Modificacion de usuarios">Modificación de usuarios</option>
              <option value="Modificacion de agenda">Modificación de agenda</option>
            </select>
          </div>
        </div>

        <div className="Campo">
          <label htmlFor="email">Correo</label>
          <input type="email" id="email" name="email" placeholder="Correo" required/>
        </div>*/}
      </div>
    </form>
  );
}

export default FormularioUsuario
