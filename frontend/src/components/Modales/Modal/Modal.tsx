import "./_modal.scss"
import Boton from "../../Inputs/Boton";
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import React, {ReactComponentElement, useState} from "react";
import {TemaComponente} from "../../../utils/Tipos.ts";

export type ModalProps = {
  trigger?: React.ReactElement,
  triggers?: React.ReactElement[],
  titulo?: React.ReactElement,
  contenido: React.ReactElement,
  botones?: ReactComponentElement<typeof Boton>[],
  mostrar?: boolean,
  sinFondo?: boolean,
  cancelar?: boolean,
  onShow?: (() => void),
  onClose?: (() => void),
  timeout?: number
}

function Dialog(props: ModalProps) {
  const [mostrar, setMostrar] = useState(props.mostrar ?? false)

  if (props.timeout) timeoutClose()

  return (
    <>
      {props.trigger ? (
        <div onClick={() => setMostrar(true)}>
          {props.trigger}
        </div>
      ) : null}

      {props.triggers?.map((trigger, index) => (
        <div key={`modal-trigger-${index}`} onClick={() => setMostrar(true)}>
          {trigger}
        </div>
      ))}

      <Modal show={mostrar} onShow={props.onShow} onHide={handleClose} backdrop="static" centered>
        <Modal.Header className={props.sinFondo ? "bg-white border-0" : undefined}>
          {props.sinFondo ? null : props.titulo}
          <div className="btn-cerrar" onClick={handleClose}>
            <Boton icono={<FaTimes/>} variant={props.sinFondo ? TemaComponente.Secundario : TemaComponente.Primario}/>
          </div>
        </Modal.Header>
        <Modal.Body>
          {props.contenido}
        </Modal.Body>
        <Modal.Footer
          className={"py-2 " + (props.botones ? "visible" : "visually-hidden") + (props.sinFondo ? " bg-white border-0" : "")}>
          {props.cancelar === false ? null : botonCancelar()}
          {props.botones ? [...props.botones] : null}
        </Modal.Footer>
      </Modal>
    </>
  )

  function botonCancelar() {
    return (
      <Boton key={"boton-cancelar"}
             variant={TemaComponente.DangerInverso}
             etiqueta="Cancelar"
             icono={<FaTimes/>}
             onClick={handleClose}
      />
    )
  }

  function handleClose() {
    setMostrar(false)
    if (props.onClose) props.onClose()
  }

  function timeoutClose() {
    if (props.timeout)
      setTimeout(() => {
        handleClose()
      }, props.timeout)
  }
}

export default Dialog
