import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import {UsuariosContext} from "../Usuarios/Usuarios.tsx"
import {useEffect} from "react";
import usuario from "../../models/Usuario.ts";

function FormularioUsuario({id = ""}) {
  return (
    <UsuariosContext.Consumer>
      {usuario => (
        <form id={id} className="d-flex flex-column gap-2">
          <Campo id="nombres"
                 type={TipoCampo.Texto}
                 placeholder="Nombre"
                 etiqueta="Nombre"
                 required={true}
                 pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
                 mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
                 onChange={(value: string) => usuario.nombre = value}
          />
          <Campo id="apellidos"
                 type={TipoCampo.Texto}
                 etiqueta="Apellidos"
                 placeholder="Apellidos"
                 required={true}
                 pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
                 mensajeError="Ingrese apellidos válidos (A-Z, a-z, máx 50)"
                 onChange={(value: string) => usuario.apellidos = value}
          />
          <Campo id="tipo"
                 type={TipoCampo.Desplegable}
                 etiqueta="Tipo de usuario"
                 placeholder="Elegir tipo de usuario"
                 required={true}
                 options={[
                   {value: "Administrador Secundario", label: "Administrador Secundario"},
                   {value: "Becario", label: "Becario"}
                 ]}
                 onChange={(value: string) => usuario.tipo = value}
          />
          <Campo id="permisos"
                 type={TipoCampo.Desplegable}
                 etiqueta="Permisos"
                 placeholder="Elegir permisos"
                 options={Permisos}
                 required={true}
                 isMulti={true}
                 onChange={(value: string) => {
                   if (usuario.permisos.includes(value)) {
                     usuario.permisos.splice(usuario.permisos.indexOf(value), 1)
                   } else {
                     usuario.permisos.push(value)
                   }
                 }}
          />
          <Campo id="correo"
                 type={TipoCampo.Email}
                 etiqueta="Correo"
                 placeholder="ejemplo@.uaslp.mx"
                 required={true}
                 mensajeError="Ingrese un correo válido"
                 onChange={(value: string) => usuario.email = value}
          />
        </form>
      )}
    </UsuariosContext.Consumer>
  );
}

export default FormularioUsuario
