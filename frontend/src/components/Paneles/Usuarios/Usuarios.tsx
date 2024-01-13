import "./_usuarios.scss"
import Boton from "../../Inputs/Boton";
import Modal from "../../Modales/Modal";
import {useState} from "react"
import CardUsuario from "../../Cards/CardUsuario";
import Usuario from "../../../models/Usuario.ts"
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import {TemaComponente} from "../../../utils/Utils.ts";
import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import {useAgregaUsuario, useObtenUsuarios} from "../../../hooks/HooksUsuario.ts";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario())
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarModalRespuesta, setMostrarModalRespuesta] = useState(false)

  const {usuarios} = useObtenUsuarios()
  const {agregaUsuario} = useAgregaUsuario(onSuccess)

  const cambiaUsuario = {
    onSingleChange: ((field: string, value: string) => setNuevoUsuario(prevState => ({
      ...prevState, [field]: field == "rpe" ? parseInt(value) : value,
    }))),
    onMultipleChange: ((_: string, value: string) => {
      let permisos: string[] = nuevoUsuario.permisos
      if (permisos.find(permiso => permiso == value)) {
        permisos.splice(nuevoUsuario.permisos.indexOf(value), 1)
      } else {
        permisos.push(value)
      }
      setNuevoUsuario(prevState => ({...prevState, permisos: permisos}))
    }),
  }

  return (
    <div className="cards-usuarios py-4 container">
      <Modal
        mostrar={mostrarModal}
        muestraModal={muestraModal}
        ocultaModal={ocultaModal}
        trigger={CardUsuario.CardNuevoUsuario}
        titulo={<div><FaRegUser/><p className="fs-5">Nuevo Usuario</p></div>}
        contenido={<FormularioUsuario usuario={nuevoUsuario} {...cambiaUsuario}/>}
        botones={[
          <Boton key={"boton-cancelar"}
                 variant={TemaComponente.DangerInverso}
                 etiqueta="Cancelar"
                 icono={<FaTimes/>}
                 onClick={ocultaModal}/>,
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={() => {
                   if (FormularioUsuario.valida()) {
                     agregaUsuario(nuevoUsuario)
                     ocultaModal()
                   }
                 }}
          />
        ]}
      />
      {modalRespuesta()}
      {usuarios?.map(usuario => {
        return <CardUsuario key={"usuario-" + usuario.id} usuario={usuario}/>
      })}
    </div>
  );

  function modalRespuesta() {
    return (
      <Modal
        mostrar={mostrarModalRespuesta}
        titulo={<div><FaRegUser/><p className="fs-5">Nuevo Usuario</p></div>}
        contenido={<p>El usuario se agregó con éxito</p>}
        muestraModal={onSuccess}
        ocultaModal={
          () => {
            setMostrarModalRespuesta(false)
          }
        }
        botones={[
          <Boton key="Boton ok"
                 onClick={() => setMostrarModalRespuesta(false)}
                 variant={TemaComponente.Primario}
                 etiqueta={"Ok"}/>
        ]}
      />
    )
  }

  function onSuccess() {
    setMostrarModalRespuesta(true)
  }

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setNuevoUsuario(new Usuario())
    setMostrarModal(false)
  }
}

export default Usuarios;
