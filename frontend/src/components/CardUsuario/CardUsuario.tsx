import "./card-usuario.scss"
import Usuario from "../../models/Usuario.ts"
import Boton from "../Boton"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser, FaTimes, FaTrash} from "react-icons/fa"
import {FcCancel} from "react-icons/fc"
import {TemaComponente} from "../../utils/Utils.ts"
import Modal from "../Modal";
import {useState} from "react";
import {ModificaUsuario} from "../FormularioUsuario";
import {useModificaUsuario, useEliminaUsuario} from "../../hooks/HooksUsuario.ts";

function CardUsuario(props: { usuario: Usuario }) {
  const [usuarioState, setUsuarioState] = useState(props.usuario)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarModalRespuesta, setMostrarModalRespuesta] = useState(false)
  const [mostrarModalRespuestaEliminar, setMostrarModalRespuestaEliminar] = useState(false)
  const [mostrarModalElimr, setMostrarModalElimr] = useState(false)

  const {modificaUsuario} = useModificaUsuario(onSuccess)
  const {eliminaUsuario} = useEliminaUsuario(onSuccessEliminar)

  const cambiaUsuario = {
    onSingleChange: ((field: string, value: string) => setUsuarioState(prevState => ({
      ...prevState, [field]: value
    }))),
    onMultipleChange: ((_: string, value: string) => {
      let permisos: string[] = usuarioState.permisos
      if (permisos.find(permiso => permiso == value)) {
        permisos.splice(usuarioState.permisos.indexOf(value), 1)
      } else {
        permisos.push(value)
      }
      setUsuarioState(prevState => ({...prevState, permisos: permisos}))
    }),
  }

  return (
    <div className="card card-usuario text-center">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
        <p className="m-0">#{props.usuario.id}</p>
        <div className="d-inline-flex gap-1">
          <Modal
            mostrar={mostrarModal}
            muestraModal={muestraModal}
            ocultaModal={ocultaModal}
            titulo={<div><FaRegUser/> <p className="fs-5">Modificar Usuario</p></div>}
            trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
            contenido={<ModificaUsuario usuario={usuarioState} {...cambiaUsuario}/>}
            botones={[
              <Boton key={"boton-caneclar"}
                     variant={TemaComponente.PrimarioInverso}
                     etiqueta="Cancelar"
                     icono={<FaTimes/>}
                     onClick={ocultaModal}/>,
              <Boton key={"boton-eliminar"}
                     variant={TemaComponente.DangerInverso}
                     etiqueta="Eliminar"
                     icono={<FaTrash/>}
              />,
              <Boton key={"boton-guardar"}
                     variant={TemaComponente.SuccessInverso}
                     etiqueta="Guardar"
                     icono={<FaRegPlusSquare/>}
                     onClick={() => {
                       if (ModificaUsuario.valida()) {
                         modificaUsuario(usuarioState)
                         ocultaModal()
                       }
                     }}
              />
            ]}
          />
          <Modal
            mostrar={mostrarModalElimr}
            muestraModal={muestraModalElimr}
            ocultaModal={ocultaModalElimr}
            titulo={<></>}
            variante={TemaComponente.Secundario}
            estiloVariante="close-footer"
            close="close"
            trigger={<Boton rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
            contenido={<><p className="fs-5 text-center">¿Esta seguro que desea eliminar el
              usuario <strong> [{props.usuario.nombre}] </strong> ?</p></>}
            botones={[
              <Boton key={"boton-caneclar"}
                     variant={TemaComponente.DangerInverso}
                     etiqueta="Cancelar"
                     icono={<FcCancel/>}
                     onClick={ocultaModalElimr}/>,
              <Boton key={"boton-eliminar"}
                     variant={TemaComponente.PrimarioInverso}
                     etiqueta="Eliminar"
                     icono={<FaTrash/>}
                     onClick={() => {
                       eliminaUsuario(usuarioState)
                       ocultaModal()
                     }}
              />,
            ]}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="w-50 mx-auto my-2 position-relative">
          <img className="w-100 rounded-circle" src="https://i.pravatar.cc/300" alt="example"/>
          <span className="position-absolute bottom-0 end-0 p-3 bg-success rounded-circle"></span>
        </div>
        <h3 className="card-title flex-fill">{props.usuario.nombre}</h3>
        <p className="card-text">{props.usuario.email}</p>
        <div className="badges d-flex flex-column gap-2">
            <span className="w-100 badge rounded-pill fs-6 fw-light">
              {props.usuario.permisos.length} Permisos
            </span>
          <span className="w-100 badge rounded-pill fs-6 fw-light">{props.usuario.tipo}</span>
        </div>
      </div>
      {modalRespuestaModificar()}
      {modalRespuestaEliminar()}
    </div>
  );

  function onSuccess() {
    setMostrarModalRespuesta(true)
  }

  function onSuccessEliminar() {
    setMostrarModalRespuestaEliminar(true)
  }

  function modalRespuestaModificar() {
    return (
      <Modal
        mostrar={mostrarModalRespuesta}
        titulo={<div><FaRegUser/><p className="fs-5">Modificar Usuario</p></div>}
        contenido={<p>El usuario se modificó con éxito</p>}
        muestraModal={onSuccess}
        ocultaModal={
          () => {
            setMostrarModalRespuesta(false)
          }
        }
        botones={[
          <Boton onClick={() => setMostrarModalRespuesta(false)} variant={TemaComponente.Primario} etiqueta={"Ok"}/>
        ]}
      />
    )
  }

  function modalRespuestaEliminar() {
    return (
      <Modal
        mostrar={mostrarModalRespuestaEliminar}
        titulo={<div><FaRegUser/><p className="fs-5">Eliminar Usuario</p></div>}
        contenido={<p>El usuario se eliminó con éxito</p>}
        muestraModal={onSuccess}
        ocultaModal={
          () => {
            setMostrarModalRespuestaEliminar(false)
          }
        }
        botones={[
          <Boton onClick={() => setMostrarModalRespuestaEliminar(false)} variant={TemaComponente.Primario}
                 etiqueta={"Ok"}/>
        ]}
      />
    )
  }

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setMostrarModal(false)
  }

  function muestraModalElimr() {
    setMostrarModalElimr(true)
  }

  function ocultaModalElimr() {
    setMostrarModalElimr(false)
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
