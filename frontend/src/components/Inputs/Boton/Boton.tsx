import "./_boton.scss"
import Nav from "react-bootstrap/Nav";
import React, {Ref} from "react"
import {Button} from "react-bootstrap";
import {TemaComponente} from "../../../utils/Utils.ts"

type BotonProps = {
  ref?: Ref<HTMLButtonElement>
  active?: boolean,
  variant?: TemaComponente,
  etiqueta?: string,
  icono?: React.ReactElement,
  eventKey?: string,
  href?: string,
  rounded?: boolean,
  onClick?: (() => void)
}

function Boton(props: BotonProps) {
  const {
    etiqueta,
    icono,
    rounded,
    ref,
    ...atributos
  } = props

  if (atributos.href != null || atributos.eventKey != null) {
    return (
      <Nav.Link {...atributos}><span>{props.etiqueta} {props.icono}</span></Nav.Link>)
  } else return (
    <Button
      ref={ref}
      className={rounded ? "rounded-circle" : ""}
      {...atributos}>
      {props.etiqueta} {props.icono}
    </Button>
  )
}

Boton.defaultProps = {
  active: false,
  variant: TemaComponente.Primario,
  etiqueta: "",
  icono: null,
  href: null,
}

export default Boton
