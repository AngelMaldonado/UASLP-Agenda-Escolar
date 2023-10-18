import "./_modal.scss"
import React, {ReactComponentElement} from "react";
import {FaTimes} from "react-icons/fa";
import Boton from "../Boton";

interface ModalProps {
  titulo?: React.ReactElement,
  trigger: React.ReactElement,
  contenido: React.ReactElement
  botones?: ReactComponentElement<typeof Boton>[],
}

class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <>
        <div data-bs-toggle="modal" className="bg-blanco-80" data-bs-target="#Modal">
          {this.props.trigger}
        </div>

        <div className="modal fade" id="Modal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {this.props.titulo}
                <div className="btn-cerrar" data-bs-dismiss="modal" aria-label="Cerrar"><Boton icono={<FaTimes/>}/>
                </div>
              </div>
              <div className="modal-body">
                {this.props.contenido}
              </div>
              <div className={"modal-footer py-2 " + (this.props.botones ? "visible" : "invisible")}>
                {this.props.botones ? this.props.botones.map((boton) => boton) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Modal
