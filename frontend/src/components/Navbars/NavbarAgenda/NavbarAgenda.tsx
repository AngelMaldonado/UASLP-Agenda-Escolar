import "./_navbar-agenda.scss"
import {useState} from 'react';
import Boton from "../../Inputs/Boton";
import ChipUsuario from "../../Chips/ChipUsuario";
import {FaRegListAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {CgCalendarToday} from 'react-icons/cg'
import CardMasEventos from "../../Cards/CardMasEventos";
import Campo, {CampoDesplegable} from "../../Inputs/Campo";
import {TemaComponente} from "../../../utils/Utils.ts";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import {Stack} from "react-bootstrap";
import Usuario from "../../../models/Usuario.ts";
import {useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import {components, OptionProps} from "react-select";
import Configuraciones from "../../../utils/Configuraciones.ts";
import Filtro from "../../../models/Filtro.ts";

type NavbarAgendaProps = {
  setKey: (k: string) => void;
  eventKeys: string[];
  sesionAdmi?: boolean;
};

function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false)

  const {filtros} = useObtenFiltros()

  const Option = (props: OptionProps<{ value: Filtro, label: string }>) => (
    <components.Option {...props} children={
      <div className="d-flex align-items-center">
        <p className="flex-fill m-0">{props.label}</p>
        <img width={25} height={25}
             src={Configuraciones.apiURL + props.data.value.icono}
             alt={"Simbología " + props.label}/>
      </div>
    }/>
  )

  const SingleValue = (props: OptionProps<{ value: Filtro, label: string }>) => (
    <components.SingleValue {...props} children={
      <div className="d-flex">
        <p className="flex-fill m-0 text-truncate">{props.data.label}</p>
        <img width={25} height={25}
             src={Configuraciones.apiURL + props.data.value.icono}
             alt={"Simbología " + props.label}/>
      </div>
    }/>
  )

  return (
    <Navbar expand="lg" className="NavbarAgenda bg-tertiary">
      <Container>
        <Campo id="buscar-evento" placeholder="Buscar evento"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 pt-2 pt-lg-0">
            <div className="flex-grow-1 d-flex gap-2">
              {desplegables()}
            </div>
            {opciones().map((opcion, index) => (
              <Nav.Item key={`navbar-agenda-item${index}`}>
                {opcion}
              </Nav.Item>
            ))}
            {props.sesionAdmi ? (
              <Stack direction="horizontal" className="UsuariosActivos" gap={1}>
                <ChipUsuario usuarios={[new Usuario()]}/>
                <ChipUsuario usuarios={[new Usuario()]}/>
                <ChipUsuario usuarios={[new Usuario()]}/>
                <ChipUsuario usuarios={[new Usuario()]}/>
                <ChipUsuario usuarios={[new Usuario(), new Usuario()]}/>
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

  function desplegables() {
    return (
      <>
        <CampoDesplegable id="comunidad"
                          placeholder="Comunidades"
                          options={filtros?.filter(f => f.categoria === "comunidad")
                            .map(f => ({value: f, label: f.nombre}))
                          }
                          components={{Option, SingleValue}}
        />
        <CampoDesplegable id="area"
                          placeholder="Áreas"
                          options={filtros?.filter(f => f.categoria === "área")
                            .map(f => ({value: f, label: f.nombre}))
                          }
                          components={{Option, SingleValue}}
        />
      </>
    )
  }

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
