import "./_navbar-agenda.scss"
import {Dispatch, SetStateAction, useState} from 'react';
import Boton from "../../Inputs/Boton";
import ChipUsuario from "../../Chips/ChipUsuario";
import {FaRegListAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {CgCalendarToday} from 'react-icons/cg'
import CardMasEventos from "../../Cards/CardMasEventos";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import {Stack} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import Desplegables from "./Desplegables.tsx";
import Filtro from "../../../models/Filtro.ts";

type NavbarAgendaProps = {
  setKey: (k: string) => void,
  setFiltros: Dispatch<SetStateAction<Filtro[]>>,
  eventKeys: string[],
  sesionAdmi?: boolean,
};

function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false)

  const {filtros} = useObtenFiltros()


  return (
    <Navbar expand="xxl" className="NavbarAgenda bg-tertiary">
      <Container>
        <Form.Control className="w-50" placeholder="Buscar evento"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 pt-2 pt-lg-0 align-items-center">
            <Desplegables filtros={filtros} setFiltros={props.setFiltros}/>
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

  function modalMasEventos() {
    return (
      <Modal size="lg" show={showModal} onHide={ocultaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Eventos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/>
          <CardMasEventos/>
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
