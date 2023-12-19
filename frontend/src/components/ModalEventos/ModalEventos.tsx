import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardAgenda from "../CardAgenda/CardAgenda.tsx";
import Evento from "../../models/Evento";
import CardMasEventos from "../CardMasEventos/CardMasEventos.tsx";

function ModalEventos() {
  let evento = new Evento();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className="modal show"
      style={{display: "block", position: "initial"}}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Eventos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CardMasEventos/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary">Agregar Evento</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEventos;