// TODO: mostrar mensaje de eliminación correcta
import "./_usuarios.scss"
import Boton from "../../Inputs/Boton";
import Modal from "../../Modales/Modal";
import {Dispatch, SetStateAction, useContext, useState} from "react"
import CardUsuario from "../../Cards/CardUsuario";
import Usuario from "../../../models/Usuario.ts"
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import {TemaComponente} from "../../../utils/Utils.ts";
import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {useAgregaUsuario, useObtenUsuarios} from "../../../hooks/HooksUsuario.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";
import {ValidationError} from "yup";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {PermisosEnum} from "../../../enums/PermisosEnum.ts";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario())
  const [errores, setErrores] = useState({})
  const usuario = useContext(AgendaContext).data.usuario;

  const {usuarios} = useObtenUsuarios()
  const {agregaUsuario, registroExitoso, reset} = useAgregaUsuario(setErrores)
  const onUsuarioChange = useModelChange(setNuevoUsuario as Dispatch<SetStateAction<Object>>)

  return (
    <div className="cards-usuarios py-4 container">
      {usuario?.permisos?.includes(PermisosEnum.CREAR_USUARIO) ? modalNuevoUsuario() : null}
      {usuarios?.map(usuario => {
        return <CardUsuario key={"usuario-" + usuario.id} usuario={usuario}/>
      })}
    </div>

  );

  function modalNuevoUsuario() {
    return (
      <Modal
        onClose={onClose}
        trigger={CardUsuario.CardNuevoUsuario}
        titulo={<div><FaRegUser/><p className="fs-5">Nuevo Usuario</p></div>}
        contenido={contenidoModal()}
        timeout={registroExitoso ? 2000 : undefined}
        sinFondo={registroExitoso}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={agregaNuevoUsuario}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso)
      return (<p>El usuario se agregó con éxito</p>)
    else
      return (<FormularioUsuario usuario={nuevoUsuario} setUsuario={onUsuarioChange} errores={errores}/>)
  }

  function agregaNuevoUsuario() {
    // Valida el nuevoUsuario antes de enviar a back
    Usuario.schema.validate(nuevoUsuario)
      // Si se validó correctamente, enviar a back
      .then(_ => agregaUsuario(nuevoUsuario))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => {
        setErrores({[r.path!]: r.errors})
        setTimeout(() => setErrores({}), 5000)
      })
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoUsuario(new Usuario())
  }
}

export default Usuarios;
