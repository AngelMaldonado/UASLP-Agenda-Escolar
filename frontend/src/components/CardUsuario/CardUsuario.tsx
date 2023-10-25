import "./card-usuario.scss"
import Usuario from "../../models/Usuario.ts"
import Boton from "../Boton"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser, FaTimes, FaTrash} from "react-icons/fa"
import {TemaComponente} from "../../utils/Utils.ts"
import Modal from "../Modal";
import {useState} from "react";
import {ModificaUsuario} from "../FormularioUsuario";
import {useModificaUsuario} from "../../hooks/HooksUsuario.ts";

function CardUsuario(props: { usuario: Usuario }) {
  const [usuarioState, setUsuarioState] = useState(props.usuario)
  const [mostrarModal, setMostrarModal] = useState(false)

  const {modificaUsuario} = useModificaUsuario()

  const cambiaUsuario = {
    onNombreChange: ((value: string) => setUsuarioState(prevState => ({...prevState, nombre: value}))),
    onTipoChange: ((value: string) =>
        setUsuarioState(prevState => ({...prevState, tipo: value}))
    ),
    onPermisosChange: ((value: string) => {
      let permisos: string[] = usuarioState.permisos
      if (permisos.find(permiso => permiso == value)) {
        permisos.splice(usuarioState.permisos.indexOf(value), 1)
      } else {
        permisos.push(value)
      }
      setUsuarioState(prevState => ({...prevState, permisos: permisos}))
    }),
    onEmailChange: ((value: string) => setUsuarioState(prevState => ({...prevState, email: value})))
  }

  return (
    <div className="card card-usuario text-center">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
        <p className="m-0">#{props.usuario.id}</p>
        <div className="d-inline-flex">
          <Modal
            mostrar={mostrarModal}
            muestraModal={muestraModal}
            ocultaModal={ocultaModal}
            titulo={<div><FaRegUser/> <p className="fs-5">Modificar Usuario</p></div>}
            trigger={<Boton tema={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
            contenido={<ModificaUsuario usuario={usuarioState} {...cambiaUsuario}/>}
            botones={[
              <Boton key={"boton-caneclar"}
                     tema={TemaComponente.PrimarioInverso}
                     etiqueta="Cancelar"
                     icono={<FaTimes/>}
                     onClick={ocultaModal}/>,
              <Boton key={"boton-eliminar"}
                     tema={TemaComponente.DangerInverso}
                     etiqueta="Eliminar"
                     icono={<FaTrash/>}
              />,
              <Boton key={"boton-guardar"}
                     tema={TemaComponente.SuccessInverso}
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
          <Boton tema={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>} onClick={() => alert("delete")}/>
        </div>
      </div>
      <div className="card-body">
        <div className="w-50 mx-auto my-2 position-relative">
          <img className="w-100 rounded-circle" src="./src/assets/example.jpg" alt="example"/>
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
    </div>
  );

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setMostrarModal(false)
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
