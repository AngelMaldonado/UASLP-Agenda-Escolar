import "./_navbar-agenda.scss"
import Boton from "../../Inputs/Boton";
import ChipUsuario from "../../Chips/ChipUsuario";
import {useNavigate} from "react-router-dom";
import {CgCalendarToday} from 'react-icons/cg'
import CardMasEventos from "../../Cards/CardMasEventos";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal';
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import {Form} from "react-bootstrap";
import Desplegables from "./Desplegables.tsx";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {useState,useContext} from "react";
import {FaTimes} from "react-icons/fa";
import {FaRegListAlt} from "react-icons/fa";
import {Stack} from "react-bootstrap";

type NavbarAgendaProps = {
  currentKey: string,
  setKey: (k: string) => void,
  eventKeys: string[],
  sesionAdmi?: boolean,
};


function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
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

    const eventos = useContext(AgendaContext).data.eventos;

    const nuevoEvento = eventos?.filter((e) => e.tipo === "alumnado").map((e) => (
      <CardMasEventos key={e.nombre} evento={e}/>
    ))
    return (
      <Modal size="lg" show={showModal} onHide={ocultaModal} >
        <Modal.Header>
          <Modal.Title>Eventos alumnado</Modal.Title>
          <div className="btn-cerrar" onClick={ocultaModal}>
            <Boton icono={<FaTimes/>} variant={TemaComponente.Primario}/>
          </div>
        </Modal.Header>
        <Modal.Body>
          {nuevoEvento?.flat()}
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
