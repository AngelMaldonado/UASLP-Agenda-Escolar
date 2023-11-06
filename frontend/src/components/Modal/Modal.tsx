import "./_modal.scss"
import Boton from "../Boton";
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import React, {ReactComponentElement} from "react";
import {TemaComponente} from "../../utils/Utils.ts"


type ModalProps = {
  trigger: React.ReactElement,
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
      <div onClick={props.muestraModal}>
        {props.trigger}
      </div>

      <Modal show={props.mostrar} onHide={props.ocultaModal} centered>
        <Modal.Header className={props.close}>
          {props.titulo}
          <div className="btn-cerrar" onClick={props.ocultaModal}>
            <Boton icono={<FaTimes />}
                   variant={props.variante}
            /> 
          </div>
        </Modal.Header>
        <Modal.Body>
          {props.contenido}
        </Modal.Body>
        <Modal.Footer className={"py-2" + (props.botones ? "visible" : "invisible")}>
          {props.botones ? props.botones.map((boton) => boton) : null}
        </Modal.Footer>
      </Modal>
    </>)
}

export default Dialog
