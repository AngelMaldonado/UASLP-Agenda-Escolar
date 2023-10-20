import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import {UsuariosContext} from "../Usuarios/Usuarios.tsx"

function FormularioUsuario() {
  return (
    <UsuariosContext.Consumer>
      {usuario => (
        <form id="form-usuario" className="d-flex flex-column gap-2">
          <Campo id="nombres"
                 tipoCampo={TipoCampo.Texto}
                 etiqueta="Nombre(s)"
                 placeholder="Nombre"
                 requerido={true}
                 onChange={(value: string) => usuario.nombre = value}
          />
          <Campo id="apellidos"
                 tipoCampo={TipoCampo.Texto}
                 etiqueta="Apellidos"
                 placeholder="Apellidos"
                 requerido={true}
                 onChange={(value: string) => usuario.apellidos = value}
          />
          <Campo id="tipo"
                 tipoCampo={TipoCampo.Desplegable}
                 etiqueta="Tipo de usuario"
                 placeholder="Elegir tipo de usuario"
                 requerido={true}
                 opciones={[
                   {value: "Administrador Secundario", label: "Administrador Secundario"},
                   {value: "Becario", label: "Becario"}
                 ]}
                 onChange={(value: string) => usuario.tipo = value}
          />
          <Campo id="permisos"
                 tipoCampo={TipoCampo.Desplegable}
                 etiqueta="Permisos"
                 placeholder="Elegir permisos"
                 opciones={Permisos}
                 requerido={true}
                 multi={true}
                 onChange={(value: string) => {
                   if (usuario.permisos.includes(value)) {
                     usuario.permisos.splice(usuario.permisos.indexOf(value), 1)
                   } else {
                     usuario.permisos.push(value)
                   }
                 }}
          />
          <Campo id="correo"
                 tipoCampo={TipoCampo.Email}
                 etiqueta="Correo"
                 placeholder="ejemplo@.uaslp.mx"
                 requerido={true}
                 onChange={(value: string) => usuario.email = value}
          />
        </form>
      )}
    </UsuariosContext.Consumer>
  );
}

export default FormularioUsuario
