import "./_boton.scss"
import React from "react"
import {TemaComponente} from "../../utils/Utils.ts"

export type BotonProps = {
  type?: "button" | "submit" | "reset" | undefined,
  onClick: (() => void)
  seleccionado?: boolean,
  tema?: TemaComponente,
  etiqueta?: string,
  icono?: React.ReactElement,
}

function Boton(props: BotonProps) {
  const {
    seleccionado,
    tema,
    etiqueta,
    icono,
    ...atributos
  } = props

  return (
    <button className={"btn btn-" + tema} {...atributos}>
      {props.etiqueta}
      {props.icono}
    </button>
  )
}

Boton.defaultProps = {
  type: "button",
  onClick: (() => {
  }),
  seleccionado: false,
  tema: TemaComponente.Primario,
  etiqueta: "",
}

export default Boton
