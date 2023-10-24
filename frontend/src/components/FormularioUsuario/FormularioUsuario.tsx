import "./_formulariousuario.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Permisos from "../../models/Permisos.ts"
import Usuario from "../../models/Usuario.ts";
import {useState} from "react";

function FormularioUsuario(props: { usuario: Usuario }) {
  const [usuario, setUsuario] = useState(props.usuario)
  return (
    <form className="d-flex flex-column gap-2 text-start">
      <Campo id="nombres"
             value={usuario.nombres}
             type={TipoCampo.Texto}
             placeholder="Nombres"
             etiqueta="Nombres"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={(value: string) => cambiaNombre(value)}
      />
      <Campo id="apellidos"
             value={usuario.apellidos}
             type={TipoCampo.Texto}
             placeholder="Apellidos"
             etiqueta="Apellidos"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 50)"
             onChange={(value: string) => cambiaApellidos(value)}
      />
      <Campo id="tipo"
             value={usuario.tipo}
             type={TipoCampo.Desplegable}
             etiqueta="Tipo de usuario"
             placeholder="Elegir tipo de usuario"
             required={true}
             options={[
               {value: "Administrador Secundario", label: "Administrador Secundario"},
               {value: "Becario", label: "Becario"}
             ]}
             onChange={(value: string) => cambiaTipo(value)}
      />
      <Campo id="permisos"
             type={TipoCampo.Desplegable}
             etiqueta="Permisos"
             placeholder="Elegir permisos"
             options={Permisos}
             required={true}
             isMulti={true}
             onChange={(value: string) => cambiaPermisos(value)}
      />
      <Campo id="correo"
             value={usuario.email}
             type={TipoCampo.Email}
             etiqueta="Correo"
             placeholder="ejemplo@.uaslp.mx"
             required={true}
             mensajeError="Ingrese un correo válido"
             onChange={(value: string) => cambiaEmail(value)}
      />
    </form>
  );

  function cambiaNombre(nombres: string) {
    setUsuario(prevState => ({...prevState, nombres: nombres}));
    console.log(usuario)
  }

  function cambiaApellidos(apellidos: string) {
    setUsuario(prevState => ({...prevState, apellidos: apellidos}));
    console.log(usuario)
  }

  function cambiaTipo(tipo: string) {
    setUsuario(prevState => ({...prevState, tipo: tipo}));
    console.log(usuario)
  }

  function cambiaPermisos(permiso: string) {
    let permisos: string[] = usuario.permisos
    if (permisos) {
      permisos.splice(usuario.permisos.indexOf(permiso), 1)
    } else {
      permisos.push(permiso)
    }
    setUsuario(prevState => ({...prevState, permisos: permisos}));
    console.log(usuario)
  }

  function cambiaEmail(email: string) {
    setUsuario(prevState => ({...prevState, email: email}));
    console.log(usuario)
  }
}

export default FormularioUsuario
