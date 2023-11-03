import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import Usuario from "../../models/Usuario.ts";

type FormularioUsuarioProps = {
  usuario: Usuario,
  onSingleChange: ((field: string, value: string) => void),
  onMultipleChange: ((field: string, value: string) => void),
}

const formModificaUsuarioId = "form-modifica-usuario"

function ModificaUsuario(props: FormularioUsuarioProps) {
  return (
    <form id={formModificaUsuarioId} className="d-flex flex-column gap-2 text-start">
      <Campo id="nombre"
             value={props.usuario.nombre}
             type={TipoCampo.Texto}
             placeholder="Nombre"
             etiqueta="Nombre"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={props.onSingleChange}
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
             onChange={props.onSingleChange}
      />
      <Campo id="permisos"
             value={props.usuario.permisos}
             type={TipoCampo.Desplegable}
             etiqueta="Permisos"
             placeholder="Elegir permisos"
             options={Permisos}
             required={true}
             isMulti={true}
             onChange={props.onMultipleChange}
      />
      <Campo id="email"
             value={props.usuario.email}
             type={TipoCampo.Email}
             etiqueta="Correo"
             placeholder="ejemplo@.uaslp.mx"
             required={true}
             mensajeError="Ingrese un correo válido"
             onChange={props.onSingleChange}
      />
    </form>
  );
}

ModificaUsuario.valida = () => {
  return (document.getElementById(formModificaUsuarioId) as HTMLFormElement).reportValidity()
}

export default ModificaUsuario
