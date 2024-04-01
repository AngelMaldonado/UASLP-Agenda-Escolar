import "./_navbar-agenda.scss"
import {useContext, useState} from 'react';
import Boton from "../../Inputs/Boton";
import ChipUsuario from "../../Chips/ChipUsuario";
import {FaChevronLeft, FaChevronRight, FaRegListAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {CgCalendarToday} from 'react-icons/cg'
import CardMasEventos from "../../Cards/CardMasEventos";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import {ButtonGroup, Stack} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Desplegables from "./Desplegables.tsx";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {meses} from "../../Calendario/Calendario.tsx";


type NavbarAgendaProps = {
  currentKey: string,
  setKey: (k: string) => void,
  eventKeys: string[],
  sesionAdmi?: boolean,
};


function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const mes = useContext(AgendaContext).data.mes
  const setData = useContext(AgendaContext).setData
  const ocultaControles = props.currentKey != "calendario" && props.currentKey != "agenda"

  return (
    <Navbar sticky="top" expand="xxl" className="NavbarAgenda bg-tertiary">
      <Container>
        <Form.Control
          className={`w-50 ${ocultaControles ? "visually-hidden" : ""}`}
          placeholder="Buscar evento"
          onChange={(e) =>
            setData(prevState => ({...prevState, textoBusqueda: e.target.value}))
          }
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="NavToggle"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 pt-2 pt-xxl-0 align-items-center justify-content-end">
            {!ocultaControles ? <Desplegables/> : null}
            {opciones().map((opcion, index) => (
              <Nav.Item key={`navbar-agenda-item${index}`}>
                {opcion}
              </Nav.Item>
            ))}
            {props.sesionAdmi ? (
              <Stack direction="horizontal" className="UsuariosActivos" gap={1}>
                <ChipUsuario usuarios={[]}/>
                <ChipUsuario usuarios={[]}/>
                <ChipUsuario usuarios={[]}/>
                <ChipUsuario usuarios={[]}/>
                <ChipUsuario usuarios={[]}/>
              </Stack>
            ) : (
              <Boton
                eventKey={props.eventKeys[1]}
                variant={TemaComponente.SecundarioInverso}
                etiqueta="Administración"
                onClick={() => navigate("/login")}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {navegacionEventos()}
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
      />,
    ]
  }

  function navegacionEventos() {
    if (props.currentKey == "agenda")
      return (
        <Navbar className="position-absolute start-50 top-100 translate-middle-x w-100 bg-body-tertiary">
          <Container className="justify-content-start">
            <ButtonGroup aria-label="Botones de navegación" className="bg-body-secondary">
              <Button variant="primary-inverse">
                <FaChevronLeft/>
              </Button>
              <Button variant="primary-inverse">
                {[...meses.entries()].filter(([_, v]) => v == mes)[0][0]}
              </Button>
              <Button variant="primary-inverse">
                <FaChevronRight/>
              </Button>
            </ButtonGroup>
          </Container>
        </Navbar>
      )
    else return null
  }

  function modalMasEventos() {

    const eventos = useContext(AgendaContext).data.eventos;

    const nuevoEvento = eventos?.filter((e) => e.tipo === "alumnado").map((e) => (
      <CardMasEventos key={e.nombre} evento={e}/>
    ))

    // const nuevoEvento = eventos.map((e) => (
    //   <CardMasEventos key={e.nombre} evento={e} />
    // ))
    return (
      <Modal size="lg" show={showModal} onHide={ocultaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Eventos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/> */}
          {nuevoEvento?.flat()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Agregar Evento</Button>
        </Modal.Footer>
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
