import './_navbar-admin.scss'
import Boton from "../../Inputs/Boton";
import Campo from "../../Inputs/Campo";
import Modal from "../../Modales/Modal";
import FormularioEvento from "../../Formularios/FormularioEvento/FormularioEvento.tsx";
import {useState} from "react";
import {FaRegCalendarAlt, FaRegFileImage, FaRegPlusSquare, FaRegUser, FaStream, FaTimes} from 'react-icons/fa'
import {useAgregaEvento} from "../../../hooks/HooksEvento.ts";
import Evento from "../../../models/Evento.ts";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function NavbarAdmin(props: { eventKeys: string[] }) {
  const [nuevoEvento, setNuevoEvento] = useState(new Evento())
  const [mostrarModal, setMostrarModal] = useState(false)

  const {agregaEvento} = useAgregaEvento()

  const cambiaEvento = {
    onSingleChange: ((field: string, value: string | Date | number | null) => setNuevoEvento(prevState => ({
      ...prevState, [field]: value,
    }))),
    onMultipleChange: ((field: string, value: any) => {
      let elementos = nuevoEvento[field as keyof typeof nuevoEvento] as any[]
      if (elementos.find(elemento => elemento == value)) {
        elementos.splice(elementos.indexOf(value), 1)
      } else {
        elementos.push(value)
      }
      setNuevoEvento(prevState => ({...prevState, [field]: elementos}))
    }),
  }

  return (
    <Nav className="navbar-expand py-2 bg-blanco-80">
      <Container className="d-flex gap-4 justify-content-between">
        <div className="flex-grow-1">
          <Campo id="busqueda" placeholder="Buscar"/>
        </div>
        <ul className="navbar-nav gap-2">
          {opciones().map((opcion, index) => (
            <li key={index}>
              <Nav.Item>
                {opcion}
              </Nav.Item>
            </li>
          ))}
        </ul>
      </Container>
    </Nav>
  )

  function opciones() {
    return [
      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Tabla de Eventos" icono={<FaRegCalendarAlt/>}
             eventKey={props.eventKeys[0]}/>,
      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Usuarios" icono={<FaRegUser/>}
             eventKey={props.eventKeys[1]}/>,
      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Filtros" icono={<FaStream/>}
             eventKey={props.eventKeys[2]}/>,
      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Símbolos" icono={<FaRegFileImage/>}
             eventKey={props.eventKeys[3]}/>,
      modalNuevoEvento(),
    ]
  }

  function modalNuevoEvento() {
    return (
      <Modal
        trigger={<Boton variant={TemaComponente.PrimarioInverso}
                        etiqueta="Crear Evento" icono={<FaRegPlusSquare/>}/>}
        mostrar={mostrarModal}
        muestraModal={muestraModal}
        ocultaModal={ocultaModal}
        titulo={<div><FaRegCalendarAlt/><p className="fs-5">Nuevo Evento</p></div>}
        contenido={<FormularioEvento evento={nuevoEvento} {...cambiaEvento}/>}
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
                   if (FormularioEvento.valida()) {
                     agregaEvento(nuevoEvento)
                     ocultaModal()
                   }
                 }}
          />
        ]}
      />
    )
  }

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setNuevoEvento(new Evento())
    setMostrarModal(false)
  }
}

export default NavbarAdmin
