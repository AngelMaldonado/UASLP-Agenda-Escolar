import './_navbaradmin.scss'
import Nav from "react-bootstrap/Nav";
import Boton from "../Boton";
import Campo from "../Campo";
import Container from "react-bootstrap/Container";
import {TemaComponente} from "../../utils/Utils.ts";
import {ReactComponentElement} from "react";
import {FaRegCalendarAlt, FaRegFileImage, FaRegPlusSquare, FaRegUser, FaStream} from 'react-icons/fa'

function NavbarAdmin(props: { eventKeys: string[] }) {
  const opciones: ReactComponentElement<typeof Boton>[] = [
    <Boton variant={TemaComponente.PrimarioInverso}
           etiqueta="Tabla de Eventos" icono={<FaRegCalendarAlt/>}
           eventKey={props.eventKeys[0]}
           onClick={() => console.log("tab1")}/>,
    <Boton variant={TemaComponente.PrimarioInverso}
           etiqueta="Usuarios" icono={<FaRegUser/>}
           eventKey={props.eventKeys[1]}
           onClick={() => console.log("tab1")}/>,
    <Boton variant={TemaComponente.PrimarioInverso}
           etiqueta="Filtros" icono={<FaStream/>}
           eventKey={props.eventKeys[2]}
           onClick={() => console.log("tab1")}/>,
    <Boton variant={TemaComponente.PrimarioInverso}
           etiqueta="Símbolos" icono={<FaRegFileImage/>}
           eventKey={props.eventKeys[3]}
           onClick={() => console.log("tab2")}/>,
    <Boton variant={TemaComponente.PrimarioInverso}
           etiqueta="Crear Evento" icono={<FaRegPlusSquare/>}
           eventKey={props.eventKeys[4]}
           onClick={() => alert('Formulario Nuevo Evento')}/>
  ];

  return (
    <Nav className="navbar-expand py-2 bg-blanco-80">
      <Container className={"d-flex gap-4 justify-content-between"}>
        <div className="flex-grow-1">
          <Campo id="busqueda" placeholder="Buscar"/>
        </div>
        <ul className="navbar-nav gap-2">
          {opciones.map((opcion, index) => (<li key={index}>{opcion}</li>))}
        </ul>
      </Container>
    </Nav>
  )
}

export default NavbarAdmin
