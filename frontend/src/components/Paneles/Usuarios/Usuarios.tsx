import "./_usuarios.scss";
import Boton from "../../Inputs/Boton";
import Modal from "../../Modales/Modal";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import CardUsuario from "../../Cards/CardUsuario";
import Usuario from "../../../models/Usuario.ts";
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import {TemaComponente} from "../../../utils/Tipos.ts";
import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {useAgregaUsuario, useObtenUsuarios} from "../../../hooks/HooksUsuario.ts";
import {ValidationError} from "yup";
import {PermisosEnum} from "../../../enums";
import useObjectAttributeChange, {useObjectChangeTimeout} from "../../../hooks/HookObjectChange.ts";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {modalTimeout} from "../../../utils/Constantes.ts";
import {Spinner} from "react-bootstrap";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario());
  const [errores, setErrores] = useState({});
  const usuario = useObtenSesion().sesion?.usuario;
  const textoBusqueda = useContext(AgendaContext).data.textoBusqueda?.toLowerCase()

  const usuarios = useObtenUsuarios().usuarios?.filter(u =>
    textoBusqueda && textoBusqueda != "" ? u.nombre!.toLowerCase().includes(textoBusqueda.toLowerCase()) : true
  )
  const {agregaUsuario, registroExitoso, agregando, reset} = useAgregaUsuario(setErrores)
  const onUsuarioChange = useObjectAttributeChange(setNuevoUsuario as Dispatch<SetStateAction<object>>)
  const onValidationError = useObjectChangeTimeout(setErrores)

  return (
    <div className="cards-usuarios py-4 container">
      {usuario?.permisos?.includes(PermisosEnum.CREAR_USUARIO)
        ? modalNuevoUsuario()
        : null}
      {usuarios?.map((usuario) => {
        return <CardUsuario key={"usuario-" + usuario.id} usuario={usuario}/>;
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
        timeout={registroExitoso ? modalTimeout : undefined}
        sinFondo={registroExitoso}
        cancelar={!registroExitoso && !agregando}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 icono={agregando ?
                   <Spinner animation="border" role="status" size="sm">
                     <span className="visually-hidden">Loading...</span>
                   </Spinner>
                   : <FaRegPlusSquare/>
                 }
                 disabled={agregando}
                 etiqueta={!agregando ? "Guardar" : "Guardando..."}
                 onClick={agregaNuevoUsuario}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso) return <p className="text-center">El usuario se agregó con éxito</p>;
    else
      return (
        <FormularioUsuario
          usuario={nuevoUsuario}
          setUsuario={onUsuarioChange}
          errores={errores}
        />
      );
  }

  function agregaNuevoUsuario() {
    // Valida el nuevoUsuario antes de enviar a back
    Usuario.schema.validate(nuevoUsuario)
      // Si se validó correctamente, enviar a back
      .then(() => agregaUsuario(nuevoUsuario))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => onValidationError({[r.path!]: r.errors}))
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoUsuario(new Usuario())
  }
}

export default Usuarios;
