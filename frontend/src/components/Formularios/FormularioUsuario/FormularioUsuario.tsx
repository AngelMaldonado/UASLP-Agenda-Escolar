import "./_formulario-usuario.scss"
import Campo, {CampoDesplegable, TipoCampoTexto} from "../../Inputs/Campo"
import Permisos from "../../../models/Permisos.ts"
import Usuario from "../../../models/Usuario.ts";

type FormularioUsuarioProps = {
  usuario: Usuario,
  onSingleChange: ((field: string, value: string) => void),
  onMultipleChange: ((field: string, value: string) => void),
}

const formNuevoUsuarioId = "form-nuevo-usuario"

function FormularioUsuario(props: FormularioUsuarioProps) {
  return (
    <form id={formNuevoUsuarioId} className="d-flex flex-column gap-2 text-start">
      <CampoDesplegable id="tipo"
                        required
                        value={props.usuario.tipo ?
                          {
                            value: props.usuario.tipo,
                            label: props.usuario.tipo[0].toUpperCase() + props.usuario.tipo.substring(1)
                          }
                          : null}
                        etiqueta="Tipo de usuario"
                        placeholder="Elegir tipo de usuario"
                        options={[
                          {value: "administrador secundario", label: "Administrador secundario"},
                          {value: "becario", label: "Becario"}
                        ]}
                        onChange={props.onSingleChange}
      />
      {camposTipoUsuario()}
      <CampoDesplegable id="permisos"
                        value={[...props.usuario.permisos.map(p => ({value: p, label: p}))]}
                        etiqueta="Permisos"
                        placeholder="Elegir permisos"
                        options={Permisos}
                        required={true}
                        isMulti={true}
                        onChange={props.onMultipleChange}
      />
    </form>
  );

  function camposTipoUsuario() {
    if (props.usuario.tipo) {
      return props.usuario.tipo == "administrador secundario" ? camposAdministrador() : camposBecario()
    } else return null
  }

  function camposBecario() {
    return (
      <>
        <Campo id="nombre"
               required
               value={props.usuario.nombre}
               type={TipoCampoTexto.Texto}
               placeholder="Nombre(s)"
               etiqueta="Nombre(s)"
               pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
               mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
               onChange={props.onSingleChange}
        />
        <Campo id="apellido"
               required
               value={props.usuario.apellido}
               type={TipoCampoTexto.Texto}
               placeholder="Apellidos"
               etiqueta="Apellidos"
               pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
               mensajeError="Ingrese apellidos válido (A-Z, a-z, máx 50)"
               onChange={props.onSingleChange}
        />
        <Campo id="email"
               required
               value={props.usuario.email}
               type={TipoCampoTexto.Email}
               etiqueta="Correo"
               placeholder="ejemplo@.uaslp.mx"
               mensajeError="Ingrese un correo válido"
               onChange={props.onSingleChange}
        />
      </>
    )
  }

  function camposAdministrador() {
    return (
      <Campo id="rpe"
             required
             type={TipoCampoTexto.Texto}
             value={props.usuario.rpe ? props.usuario.rpe.toString() : undefined}
             placeholder="RPE"
             etiqueta="RPE"
             maxLength={6}
             pattern={"[0-9]{6}"}
             mensajeError="Ingrese el RPE (6 dígitos)"
             onChange={props.onSingleChange}
      />
    )
  }
}

FormularioUsuario.valida = () => {
  return (document.getElementById(formNuevoUsuarioId) as HTMLFormElement).reportValidity()
}

export default FormularioUsuario
