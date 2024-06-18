import './_navbar-admin.scss'
import Boton from "../../Inputs/Boton";
import Modal from "../../Modales/Modal";
import FormularioEvento from "../../Formularios/FormularioEvento/FormularioEvento.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {FaRegCalendarAlt, FaRegFileImage, FaRegPlusSquare, FaRegUser, FaStream} from 'react-icons/fa'
import {useAgregaEvento} from "../../../hooks/HooksEvento.ts";
import Evento from "../../../models/Evento.ts";
import {TemaComponente} from "../../../utils/Tipos.ts";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Navbar, Spinner} from 'react-bootstrap';
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {ValidationError} from "yup";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {Temporizador} from "./Temporizador.tsx";

export type NavbarAdminProps = {
  currentKey: string,
  setKey: (k: string) => void,
  eventKeys: string[]
}

function NavbarAdmin(props: NavbarAdminProps) {
  const [nuevoEvento, setNuevoEvento] = useState(new Evento())
  const [errores, setErrores] = useState({})
  const usuario = useObtenSesion().sesion?.usuario;

  const {agregaEvento, registroExitoso, agregando, reset} = useAgregaEvento(setErrores)
  const onEventoChange = useObjectAttributeChange(setNuevoEvento as Dispatch<SetStateAction<Object>>)
  nuevoEvento.usuario_id = 1

  return (
    <Navbar expand="xl" className="bg-blanco-80 NavbarAdmin">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavToggle ms-auto"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="pt-2 pt-xl-0">
            <div className='NavbarCollapse w-100'>
              <ul className="navbar-nav gap-2 justify-content-between">
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
      usuario?.permisos?.includes(PermisosEnum.CREAR_EVENTO) ? modalNuevoEvento() : undefined,
      <Temporizador/>
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
                 onClick={agregaNuevoEvento}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso)
      return (<p className="text-center">El evento se agregó con éxito</p>)
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
    setNuevoEvento(new Evento())
    setErrores({})
    reset()
  }
}

export default NavbarAdmin
