import "./_formulariousuario.scss"
import Campo, {CampoDesplegable, TipoCampoTexto} from "../Campo"
import Permisos from "../../models/Permisos.ts"
import Usuario from "../../models/Usuario.ts";

type FormularioUsuarioProps = {
  usuario: Usuario,
  onSingleChange: ((field: string, value: string) => void),
  onMultipleChange: ((field: string, value: string) => void),
}

const formNuevoUsuarioId = "form-nuevo-usuario"

function NuevoUsuario(props: FormularioUsuarioProps) {
  return (
    <form id={formNuevoUsuarioId} className="d-flex flex-column gap-2 text-start">
      <Campo id="nombres"
             value={props.usuario.nombres}
             type={TipoCampoTexto.Texto}
             placeholder="Nombres"
             etiqueta="Nombres"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={props.onSingleChange}
      />
      <Campo id="apellidos"
             value={props.usuario.apellidos}
             type={TipoCampoTexto.Texto}
             placeholder="Apellidos"
             etiqueta="Apellidos"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={props.onSingleChange}
      />
      <CampoDesplegable id="tipo"
                        value={props.usuario.tipo}
                        etiqueta="Tipo de usuario"
                        placeholder="Elegir tipo de usuario"
                        required={true}
                        options={[
                          {value: "Administrador Secundario", label: "Administrador Secundario"},
                          {value: "Becario", label: "Becario"}
                        ]}
                        onChange={props.onSingleChange}
      />
      <CampoDesplegable id="permisos"
                        etiqueta="Permisos"
                        placeholder="Elegir permisos"
                        options={Permisos}
                        required={true}
                        isMulti={true}
                        onChange={props.onMultipleChange}
      />
      <Campo id="email"
             value={props.usuario.email}
             type={TipoCampoTexto.Email}
             etiqueta="Correo"
             placeholder="ejemplo@.uaslp.mx"
             required={true}
             mensajeError="Ingrese un correo válido"
             onChange={props.onSingleChange}
      />
    </form>
  );
}

NuevoUsuario.valida = () => {
  return (document.getElementById(formNuevoUsuarioId) as HTMLFormElement).reportValidity()
}

export default NuevoUsuario
