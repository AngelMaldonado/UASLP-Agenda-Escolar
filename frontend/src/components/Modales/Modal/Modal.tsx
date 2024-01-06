import "./_modal.scss"
import Boton from "../../Inputs/Boton";
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import React, {ReactComponentElement} from "react";

type ModalProps = {
  trigger?: React.ReactElement,
  titulo?: React.ReactElement,
  contenido: React.ReactElement,
  botones?: ReactComponentElement<typeof Boton>[],
  mostrar?: boolean,
  variante?: React.ReactElement,
  estiloVariante?: string,
  close?: string;
  muestraModal: (() => void)
  ocultaModal: (() => void)
}

function Dialog(props: ModalProps) {
  return (
    <>
      {props.trigger ? (
        <div onClick={props.muestraModal}>
          {props.trigger}
        </div>
      ) : null}

      <Modal show={props.mostrar} onHide={props.ocultaModal} centered>
        <Modal.Header className={props.close}>
          {props.titulo}
          <div className="btn-cerrar" onClick={props.ocultaModal}>
            <Boton icono={<FaTimes/>}
                   variant={props.variante}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          {props.contenido}
        </Modal.Body>
        <Modal.Footer className={"py-2" + (props.botones ? "visible" : "invisible")} id={props.estiloVariante}>
          {props.botones ? props.botones.map((boton) => boton) : null}
        </Modal.Footer>
      </Modal>
    </>)
}

export default Dialog
