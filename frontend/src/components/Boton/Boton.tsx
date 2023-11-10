import "./_boton.scss"
import Nav from "react-bootstrap/Nav";
import React from "react"
import {Button} from "react-bootstrap";
import {TemaComponente} from "../../utils/Utils.ts"

type BotonProps = {
  active?: boolean,
  variant?: TemaComponente,
  etiqueta?: string,
  icono?: React.ReactElement,
  eventKey?: string,
  href?: string,
  onClick?: (() => void)
}

function Boton(props: BotonProps) {
  const {
    etiqueta,
    icono,
    ...atributos
  } = props
  
  if (atributos.href != null || atributos.eventKey != null) {
    return(<Nav.Link {...atributos}> <span /*className="border-bottom"*/>{props.etiqueta} {props.icono}</span></Nav.Link>)
  } else return (<Button {...atributos}>{props.etiqueta} {props.icono}</Button>)
}

Boton.defaultProps = {
  active: false,
  variant: TemaComponente.Primario,
  etiqueta: "",
  icono: null,
  href: null,
}

export default Boton