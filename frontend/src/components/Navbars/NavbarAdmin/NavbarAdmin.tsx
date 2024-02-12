// TODO: establecer el id del usuario en nuevoEvento con la sesión

import './_navbar-admin.scss'
import Boton from "../../Inputs/Boton";
import Campo from "../../Inputs/Campo";
import Modal from "../../Modales/Modal";
import FormularioEvento from "../../Formularios/FormularioEvento/FormularioEvento.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {FaRegCalendarAlt, FaRegFileImage, FaRegPlusSquare, FaRegUser, FaStream} from 'react-icons/fa'
import {useAgregaEvento} from "../../../hooks/HooksEvento.ts";
import Evento from "../../../models/Evento.ts";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Navbar} from 'react-bootstrap';
import useModelChange from "../../../hooks/HookModelChange.ts";
import {ValidationError} from "yup";

export type NavbarAdminProps = {
  setKey: (k: string) => void,
  eventKeys: string[]
}

function NavbarAdmin(props: NavbarAdminProps) {
  const [nuevoEvento, setNuevoEvento] = useState(new Evento())
  const [errores, setErrores] = useState({})

  const {agregaEvento, registroExitoso, reset} = useAgregaEvento(setErrores)
  const onEventoChange = useModelChange(setNuevoEvento as Dispatch<SetStateAction<Object>>)
  nuevoEvento.usuario_id = 1

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-blanco-80">
      <Container className='gap-2'>
        <div className="flex-grow-1 NavBusqueda">
          <Campo id="busqueda" placeholder="Buscar"/>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavToggle"/>
        <Navbar.Collapse id="basic-navbar-nav" className=''>
          <Nav className="w-100 ">
            <div className='NavbarCollapse'>
              <ul className="navbar-nav gap-2">
                {opciones().map((opcion, index) => (
                  <li key={index}>
                    <Nav.Item>
                      {opcion}
                    </Nav.Item>
                  </li>
                ))}
              </ul>
            </div>

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
        onClose={onClose}
        trigger={<Boton variant={TemaComponente.PrimarioInverso}
                        etiqueta="Crear Evento" icono={<FaRegPlusSquare/>}/>}
        titulo={<div><FaRegCalendarAlt/> <p className="fs-5">Nuevo Evento</p></div>}
        contenido={contenidoModal()}
        timeout={registroExitoso ? 2000 : undefined}
        sinFondo={registroExitoso}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={agregaNuevoEvento}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso)
      return (<p>El evento se agregó con éxito</p>)
    else
      return (<FormularioEvento evento={nuevoEvento} setEvento={onEventoChange} errores={errores}/>)
  }

  function agregaNuevoEvento() {
    // Valida el nuevoUsuario antes de enviar a back
    Evento.schema.validate(nuevoEvento)
      // Si se validó correctamente, enviar a back
      .then(_ => agregaEvento(nuevoEvento))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => {
        setErrores({[r.path!]: r.errors})
        setTimeout(() => setErrores({}), 5000)
      })
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoEvento(new Evento())
  }
}

export default NavbarAdmin
