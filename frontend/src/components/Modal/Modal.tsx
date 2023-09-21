import "./Modal.css"
import React from "react";

interface ModalProps {
  componente: React.ReactElement,
  mostrar: boolean,
  onClose: React.MouseEventHandler
}

function Modal(props: ModalProps) {
    if(props.mostrar) {
      return (
        <div className="Modal">
          <div onClick={props.onClose} className="Overlay"></div>
          <div className="ContenidoModal">
            {props.componente}
          </div>
        </div>
      )
    } else return null
}

export default Modal
