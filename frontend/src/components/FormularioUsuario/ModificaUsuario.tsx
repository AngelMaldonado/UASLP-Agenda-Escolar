import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import Usuario from "../../models/Usuario.ts";

type FormularioUsuarioProps = {
  usuario: Usuario,
  onNombreChange: ((value: string) => void),
  onTipoChange: ((value: string) => void),
  onPermisosChange: ((value: string) => void),
  onEmailChange: ((value: string) => void),
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
             onChange={props.onNombreChange}
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
             value={props.usuario.permisos}
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

ModificaUsuario.valida = () => {
  return (document.getElementById(formModificaUsuarioId) as HTMLFormElement).reportValidity()
}

export default ModificaUsuario
