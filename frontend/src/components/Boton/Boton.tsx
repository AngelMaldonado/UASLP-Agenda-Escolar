import "./_boton.scss"
import React, {Component} from "react"
import {TemaComponente} from "../../utils/Utils.ts"

export enum TipoBoton {
  Link = "link",
  Normal = "button",
  Submit = "submit",
}

export interface BotonProps {
  seleccionado?: boolean,
  tema?: TemaComponente,
  etiqueta?: string,
  icono?: React.ReactElement,
  tipoBoton?: TipoBoton,
  onClick: React.MouseEventHandler
}

class Boton extends Component<BotonProps> {
  static defaultProps = {
    seleccionado: false,
    tema: TemaComponente.Primario,
    etiqueta: "",
    tipoBoton: TipoBoton.Normal,
    onClick: () => {
    },
  }

  render() {
    switch (this.props.tipoBoton) {
      case TipoBoton.Normal:
        return (
          <button className={"btn btn-" + this.props.tema} type={this.props.tipoBoton} onClick={this.props.onClick}>
            {this.props.etiqueta}
            {this.props.icono}
          </button>
        )
      case TipoBoton.Link:
        return (
          <a className={"btn btn-" + this.props.tema} type={this.props.tipoBoton} onClick={this.props.onClick}>
            {this.props.etiqueta}
            {this.props.icono}
          </a>
        )
      case TipoBoton.Submit:
        return (
          <button className={"btn btn-" + this.props.tema} type={this.props.tipoBoton} onClick={this.props.onClick}>
            {this.props.etiqueta}
            {this.props.icono}
          </button>
        )
    }
  }
}

export default Boton
