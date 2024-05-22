import "./_navbar-agenda.scss"
import Boton from "../../Inputs/Boton";
import ChipsUsuarios from "../../Chips/ChipsUsuarios";
import {useLocation, useNavigate} from "react-router-dom";
import {CgCalendarToday} from 'react-icons/cg'
import CardMasEventos from "../../Cards/CardMasEventos";
import {TemaComponente} from "../../../utils/Tipos.ts";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import {Form, Modal} from "react-bootstrap";
import Desplegables from "./Desplegables.tsx";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {useContext, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {FaRegListAlt} from "react-icons/fa";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";

type NavbarAgendaProps = {
  currentKey: string,
  setKey: (k: string) => void,
  eventKeys: string[],
};


function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const {setData} = useContext(AgendaContext)
  const [showModal, setShowModal] = useState(false)
  const {sesion} = useObtenSesion()
  const ocultaControles = props.currentKey != "calendario" && props.currentKey != "agenda"

  return (
    <Navbar sticky="top" expand="xl" className="NavbarAgenda bg-tertiary">
      <Container>
        <Form.Control
          className={"flex-grow-1 me-2 me-xl-4 Busqueda"}
          placeholder={ocultaControles ? "Buscar registro" : "Buscar evento"}
          onChange={(e) =>
            setData(prevState => ({...prevState, textoBusqueda: e.target.value}))
          }
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavToggle ms-auto"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="pt-2 gap-2 pt-xl-0 w-100 justify-content-xl-end">
            {!ocultaControles ? <Desplegables/> : null}
            {opciones().map((opcion, index) => (
              <Nav.Item key={`navbar-agenda-item-${index}`}>
                {opcion}
              </Nav.Item>
            ))}
            {location.pathname == "/administracion" && sesion?.usuario ? (
              <ChipsUsuarios/>
            ) : (
              <Boton
                eventKey={props.eventKeys[1]}
                variant={TemaComponente.SecundarioInverso}
                etiqueta="Administración"
                onClick={() => {
                  if (!sesion?.usuario)
                    navigate("/login")
                  else
                    navigate("administracion")
                }}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {modalMasEventos()}
    </Navbar>
  );

  function opciones() {
    return [
      <Boton variant={TemaComponente.SecundarioInverso}
             etiqueta="Calendario"
             icono={<CgCalendarToday/>}
             onClick={() => props.setKey(props.eventKeys[0])}
      />,
      <Boton variant={TemaComponente.SecundarioInverso}
             etiqueta="Agenda" icono={<FaRegListAlt/>}
             onClick={() => props.setKey(props.eventKeys[1])}
      />,
      <Boton
        etiqueta="Más Eventos"
        variant={TemaComponente.SecundarioInverso}
        onClick={() => muestraModal()}
      />
    ]
  }

  function modalMasEventos() {
    const eventos = useContext(AgendaContext).data.eventos;

    const eventosAlumnado = eventos?.filter((e) => e.tipo === "alumnado").map((e) => (
      <CardMasEventos key={e.nombre} evento={e}/>
    ))

    return (
      <Modal size="lg" show={showModal} onHide={ocultaModal}>
        <Modal.Header>
          <Modal.Title>Eventos alumnado</Modal.Title>
          <div className="btn-cerrar" onClick={ocultaModal}>
            <Boton icono={<FaTimes/>} variant={TemaComponente.Primario}/>
          </div>
        </Modal.Header>
        <Modal.Body>
          {eventosAlumnado?.flat()}
        </Modal.Body>
        <Modal.Footer/>
      </Modal>
    );
  }

  function muestraModal() {
    setShowModal(true);
  }

  function ocultaModal() {
    setShowModal(false);
  }
}

export default NavbarAgenda;
