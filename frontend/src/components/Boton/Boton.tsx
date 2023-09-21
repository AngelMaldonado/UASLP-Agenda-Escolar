import './Boton.css'
import React, {Component} from 'react'

enum TipoBoton {
  Primario="Primario",
  Blanco="Blanco",
  Error="Error",
  Exito="Exito"
}

interface BotonProps {
  tipo?: TipoBoton,
  etiqueta?: string,
  icono?: React.ReactElement,
  onClick: React.MouseEventHandler
}

class Boton extends Component<BotonProps> {
  render() {
    if(this.props.etiqueta && this.props.icono) {
      return (
        null
      )
    } else if (this.props.etiqueta) {
      return (
        null
      )
    } else if (this.props.icono) {
      return (
        <button onClick={this.props.onClick} className={"Boton Boton-icono"}>
          {this.props.icono}
        </button>
      )
    } else return null
  }
}

export default Boton
