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
import { Navbar } from 'react-bootstrap';

export type NavbarAdminProps = {
  setKey: (k: string) => void,
  eventKeys: string[] 
}

function NavbarAdmin(props: NavbarAdminProps) {
  const [nuevoEvento, setNuevoEvento] = useState(new Evento())
  const [mostrarModal, setMostrarModal] = useState(false)

  const {agregaEvento} = useAgregaEvento()

  const cambiaEvento = {
    onSingleChange: ((field: string, value: string | Date | File | number | null) => setNuevoEvento(prevState => ({
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
    <Navbar expand="lg" className="bg-body-tertiary bg-blanco-80">
      <Container className='gap-2'>
            <div className="flex-grow-1 NavBusqueda">
              <Campo id="busqueda" placeholder="Buscar"/>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavToggle"/>
            <Navbar.Collapse id="basic-navbar-nav" className=''>
              <Nav className="w-100 " >
                <div className='NavbarCollapse'><ul className="navbar-nav gap-2">
                  {opciones().map((opcion, index) => (
                    <li key={index}>
                      <Nav.Item>
                        {opcion}
                      </Nav.Item>
                    </li>
                  ))}
                </ul></div>
                
              </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
   
  )

  function opciones() {
    return [
      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Tabla de Eventos" icono={<FaRegCalendarAlt/>}
             onClick={() => props.setKey(props.eventKeys[0])}/>,

      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Usuarios" icono={<FaRegUser/>}
             onClick={() => props.setKey(props.eventKeys[1])}/>,

      <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Filtro" icono={<FaStream/>}
             onClick={() => props.setKey(props.eventKeys[2])}/>,
             
             <Boton variant={TemaComponente.PrimarioInverso}
             etiqueta="Símbolos" icono={<FaRegFileImage/>}
             onClick={() => props.setKey(props.eventKeys[3])}/>,
             
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
                     console.log(nuevoEvento)
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
