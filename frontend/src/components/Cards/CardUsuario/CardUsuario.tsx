import "./_card-usuario.scss"
import Usuario from "../../../models/Usuario.ts"
import Boton from "../../Inputs/Boton"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser} from "react-icons/fa"
import {TemaComponente} from "../../../utils/Utils.ts"
import Modal from "../../Modales/Modal";
import {Dispatch, SetStateAction, useState} from "react";
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import {useModificaUsuario, useEliminaUsuario} from "../../../hooks/HooksUsuario.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";

function CardUsuario(props: { usuario: Usuario }) {
  const [usuario, setUsuario] = useState(props.usuario)
  const [errores, setErrores] = useState({})
  const [eliminando, setEliminando] = useState(false)

  const {
    modificaUsuario,
    modificacionExitosa,
    reset
  } = useModificaUsuario(setErrores, setUsuario)
  const {eliminaUsuario, eliminacionExitosa} = useEliminaUsuario(setErrores)
  const cambiaUsuario = useModelChange(setUsuario as Dispatch<SetStateAction<Object>>)

  return (
    <div className="card card-usuario text-center">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
        <p className="m-0">#{props.usuario.id}</p>
        <div className="d-inline-flex gap-1">
          {modalUsuario()}
        </div>
      </div>
      <div className="card-body">
        <div className="w-50 mx-auto my-2 position-relative">
          <img className="w-100 rounded-circle" src="https://i.pravatar.cc/300" alt="example"/>
          <span className="position-absolute bottom-0 end-0 p-3 bg-success rounded-circle"></span>
        </div>
        <h3 className="card-title flex-fill">{props.usuario.nombre + " " + props.usuario.apellido}</h3>
        <p className="card-text">{props.usuario.email}</p>
        <div className="badges d-flex flex-column gap-2">
            <span className="w-100 badge rounded-pill fs-6 fw-light">
              {props.usuario.permisos?.length} Permisos
            </span>
          <span
            className="w-100 badge rounded-pill fs-6 fw-light">{props.usuario.tipo![0].toUpperCase() + props.usuario.tipo?.substring(1)}</span>
        </div>
      </div>
    </div>
  );

  function modalUsuario() {
    return (
      <Modal
        sinFondo={eliminando || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa}
        timeout={modificacionExitosa ? 2000 : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegUser/> <p className="fs-5">Modificar Usuario</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
      />
    )
  }

  function triggers() {
    return ([
      <Boton key={"boton-modificar-usuario-" + props.usuario.id}
             rounded
             variant={TemaComponente.PrimarioInverso}
             icono={<FaRegEdit/>}
             onClick={() => setEliminando(false)}
      />,
      <Boton key={"eliminar-usuario" + props.usuario.id}
             rounded
             variant={TemaComponente.DangerInverso}
             icono={<FaRegTrashAlt/>}
             onClick={() => setEliminando(true)}
      />
    ])
  }

  function contenidoModal() {
    if (modificacionExitosa) {
      return <p>El usuario se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p>El usuario se eliminó correctamente</p>
    } else if (eliminando) {
      return <p className="fs-5 text-center">
        ¿Esta seguro que desea eliminar el
        usuario <strong> [{props.usuario.nombre + " " + props.usuario.apellido}] </strong> ?
      </p>
    } else return <FormularioUsuario usuario={usuario} setUsuario={cambiaUsuario} errores={errores}/>
  }

  function botonesModal() {
    return [
      <Boton key={"boton-eliminar"}
             variant={TemaComponente.PrimarioInverso}
             etiqueta="Eliminar"
             icono={<FaRegTrashAlt/>}
             onClick={() => eliminando ? eliminaUsuario(usuario) : setEliminando(true)}
      />,
      !eliminando ?
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               etiqueta="Guardar"
               icono={<FaRegPlusSquare/>}
               onClick={modificaUsuarioExistente}
        /> : <></>
    ]
  }

  function modificaUsuarioExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Usuario.schema.validate(usuario)
      // Si se validó correctamente, enviar a back
      .then(_ => modificaUsuario(usuario))
      // Si no coincide con el esquema, mostrar errores
      .catch(r => console.log(r))
  }

  function onClose() {
    reset()
    setUsuario(props.usuario)
    setErrores({})
    setEliminando(false)
  }
}

CardUsuario.CardNuevoUsuario = (
  <div className="card card-nuevo-usuario text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus/>
      </div>
      <h3 className="card-title">Nuevo Usuario</h3>
    </div>
  </div>
)

export default CardUsuario;
