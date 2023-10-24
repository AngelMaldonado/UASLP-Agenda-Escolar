import "./_modal.scss"
import Boton from "../Boton";
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {TemaComponente} from "../../utils/Utils.ts";
import React, {ReactComponentElement, useState} from "react";

type ModalProps = {
  trigger: React.ReactElement,
  titulo?: React.ReactElement,
  contenido: React.ReactElement,
  botones?: ReactComponentElement<typeof Boton>[],
  onClose?: (() => void)
  botonCancelar?: boolean,
}

function Dialog(props: ModalProps) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    props.onClose ? props.onClose() : null
    setShow(false)
  };

  return (
    <>
      <div onClick={handleShow}>
        {props.trigger}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {props.titulo}
          <div className="btn-cerrar" onClick={handleClose}>
            <Boton icono={<FaTimes/>}/>
          </div>
        </Modal.Header>
        <Modal.Body>
          {props.contenido}
        </Modal.Body>
        <Modal.Footer className={"py-2 " + (props.botones ? "visible" : "invisible")}>
          {props.botonCancelar ?
            <Boton tema={TemaComponente.DangerInverso} etiqueta="Cancelar" icono={<FaTimes/>} onClick={handleClose}/>
            : null}
          {props.botones ? props.botones.map((boton) => boton) : null}
        </Modal.Footer>
      </Modal>
    </>)
}

export default Dialog
