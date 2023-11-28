<<<<<<< HEAD
import "./NavbarAgenda.scss";
import { CgCalendarToday } from "react-icons/cg";
import BotonesFiltros from "../BtnFiltros/BtnsFiltros";
import Avatares from "../UserStatus/UserStatus";
import Campo, { CampoDesplegable } from "../Campo";
=======
import "./NavbarAgenda.scss"
import {CgCalendarToday} from 'react-icons/cg'
import Campo, {CampoDesplegable} from "../Campo";
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
import Boton from "../Boton";
import { TamanoComponente, TemaComponente } from "../../utils/Utils.ts";
import { FaRegListAlt } from "react-icons/fa";
import ChipUsuario from "../ChipUsuario";
import Comunidades from "../../models/Comunidades.ts";
import Areas from "../../models/Areas.ts";
<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TarjetaLarga from "../CardAgenda/CardAgenda.tsx";
import CardMasEventos from "../CardMasEventos/CardMasEventos.tsx";
=======
import {ReactComponentElement, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TarjetaLarga from "../CardAgenda/CardAgenda.tsx";
import Nav from "react-bootstrap/Nav";
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8

type NavbarAgendaProps = {
  eventKeys: string[];
  sesionAdmi?: boolean;
};

function NavbarAgenda(props: NavbarAgendaProps) {
  const navigate = useNavigate();

<<<<<<< HEAD
  // const [nuevoEvento, setNuevoEvento] = useState(new Evento())
  const [showModal, setShowModal] = useState(false);
=======
  const [showModal, setShowModal] = useState(false)
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
  const [muestraOp1, cambiaOp1] = useState(true);

  const opcion1Click = () => cambiaOp1(true);
  const opcion2Click = () => cambiaOp1(false);

  const opciones: ReactComponentElement<typeof Boton>[] = [
    <Boton eventKey={props.eventKeys[0]}
           variant={TemaComponente.SecundarioInverso}
           etiqueta="Agenda"
           icono={<FaRegListAlt/>}
           onClick={opcion2Click}
    />,
    <Boton eventKey={props.eventKeys[1]}
           variant={TemaComponente.SecundarioInverso}
           etiqueta="Calendario"
           icono={<CgCalendarToday/>}
           onClick={opcion1Click}
    />,
    <Boton
      etiqueta="Más Eventos"
      variant={TemaComponente.SecundarioInverso}
      onClick={() => verModal()}

    />,
    <Boton
      variant={TemaComponente.SecundarioInverso}
      etiqueta="Administración"
      onClick={() => navigate('/login')}
    />
  ];

  return (
    <Nav className="navbar navbar-expand-lg bg-tertiary">
      <div className="container gap-5 justify-content-between">
        <div className="d-flex flex-grow-1 gap-2">
          <CampoDesplegable
            id="comunidad"
            placeholder="Comunidad"
            options={Comunidades}
          />
          <Campo id="busqueda" placeholder="Buscar" />
          <CampoDesplegable id="area" placeholder="Área" options={Areas} />
        </div>
<<<<<<< HEAD
        {muestraOp1 ? (
          <Boton
            eventKey={props.eventKeys[0]}
            variant={TemaComponente.SecundarioInverso}
            etiqueta="Agenda"
            icono={<FaRegListAlt />}
            onClick={opcion2Click}
          />
        ) : (
          <Boton
            eventKey={props.eventKeys[1]}
            variant={TemaComponente.SecundarioInverso}
            etiqueta="Calendario"
            icono={<CgCalendarToday />}
            onClick={opcion1Click}
          />
        )}

        <Boton
          eventKey={props.eventKeys[2]}
          etiqueta="Más Eventos"
          variant={TemaComponente.SecundarioInverso}
          onClick={() => verModal()}
        />
        {props.sesionAdmi ? (
          <div className="d-flex gap-1">
            <ChipUsuario tamano={TamanoComponente.Sm} />
            <ChipUsuario tamano={TamanoComponente.Sm} />
            <ChipUsuario tamano={TamanoComponente.Sm} />
            <ChipUsuario tamano={TamanoComponente.Sm} />
          </div>
        ) : (
          <Boton
            eventKey={props.eventKeys[1]}
            variant={TemaComponente.SecundarioInverso}
            etiqueta="Administración"
            onClick={() => navigate("/login")}
          />
        )}
        {modalMasEventos()}
      </div>
    </nav>
  );
=======
        {muestraOp1 ?
          <Nav.Item>{opciones[0]}</Nav.Item> :
          <Nav.Item>{opciones[1]}</Nav.Item>
        }
        {opciones[2]}
        {props.sesionAdmi ?
          (
            <div className="d-flex gap-1">
              <ChipUsuario tamano={TamanoComponente.Sm}/>
              <ChipUsuario tamano={TamanoComponente.Sm}/>
              <ChipUsuario tamano={TamanoComponente.Sm}/>
              <ChipUsuario tamano={TamanoComponente.Sm}/>
            </div>
          ) :
          opciones[3]
        }
        {modalMasEventos()}
      </div>
    </Nav>
  )

>>>>>>> da1419496d00073123a03ca075a9722208ce75d8

  function modalMasEventos() {
    return (
      // <div
      // className="modal show"
      // style={{ display: 'block', position: 'initial' }}>
      <Modal size="lg" show={showModal} onHide={ocultaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Eventos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
<<<<<<< HEAD
          <CardMasEventos />
          <CardMasEventos />
          <CardMasEventos />
          <CardMasEventos />
          <CardMasEventos />
=======
          <TarjetaLarga/>
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary">Agregar Evento</Button>
        </Modal.Footer>
      </Modal>
      // </div>
    );
  }

  function verModal() {
    setShowModal(true);
  }

  function ocultaModal() {
    setShowModal(false);
  }
}

export default NavbarAgenda;
