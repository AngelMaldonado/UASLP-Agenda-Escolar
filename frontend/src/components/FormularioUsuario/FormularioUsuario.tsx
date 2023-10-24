import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import Usuario from "../../models/Usuario.ts";

type FormularioUsuarioProps = {
  usuario: Usuario,
  onNombresChange: ((value: string) => void),
  onApellidosChange: ((value: string) => void),
  onTipoChange: ((value: string) => void),
  onPermisosChange: ((value: string) => void),
  onEmailChange: ((value: string) => void),
}

const formNuevoUsuarioId = "form-nuevo-usuario"

function FormularioUsuario(props: FormularioUsuarioProps) {
  return (
    <form id={formNuevoUsuarioId} className="d-flex flex-column gap-2 text-start">
      <Campo id="nombres"
             value={props.usuario.nombres}
             type={TipoCampo.Texto}
             placeholder="Nombres"
             etiqueta="Nombres"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={props.onNombresChange}
      />
      <Campo id="apellidos"
             value={props.usuario.apellidos}
             type={TipoCampo.Texto}
             placeholder="Apellidos"
             etiqueta="Apellidos"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={props.onApellidosChange}
      />
      <Campo id="tipo"
             value={props.usuario.tipo}
             type={TipoCampo.Desplegable}
             etiqueta="Tipo de usuario"
             placeholder="Elegir tipo de usuario"
             required={true}
             options={[
               {value: "Administrador Secundario", label: "Administrador Secundario"},
               {value: "Becario", label: "Becario"}
             ]}
             onChange={props.onTipoChange}
      />
      <Campo id="permisos"
             type={TipoCampo.Desplegable}
             etiqueta="Permisos"
             placeholder="Elegir permisos"
             options={Permisos}
             required={true}
             isMulti={true}
             onChange={props.onPermisosChange}
      />
      <Campo id="correo"
             value={props.usuario.email}
             type={TipoCampo.Email}
             etiqueta="Correo"
             placeholder="ejemplo@.uaslp.mx"
             required={true}
             mensajeError="Ingrese un correo válido"
             onChange={props.onEmailChange}
      />
    </form>
  );
}

FormularioUsuario.valida = () => {
  return (document.getElementById(formNuevoUsuarioId) as HTMLFormElement).reportValidity()
}

export default FormularioUsuario
