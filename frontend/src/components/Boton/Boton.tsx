import './Boton.css'
import React, {Component} from 'react'

enum TipoBoton {
  Primario = "Primario",
  Blanco = "Blanco",
  Error = "Error",
  Exito = "Exito"
}

interface BotonProps {
  seleccionado?: boolean,
  tipo?: TipoBoton,
  etiqueta?: string,
  icono?: React.ReactElement,
  onClick: React.MouseEventHandler
}

class Boton extends Component<BotonProps> {
  render() {
    if (this.props.etiqueta && this.props.icono) {
      return (
        <button onClick={this.props.onClick}
                className={'Boton' + (this.props.seleccionado ? ' Boton__Seleccionado' : '')}
        >
          <p>{this.props.etiqueta}</p>
          {this.props.icono}
        </button>
      )
    } else if (this.props.etiqueta) {
      return (
        null
      )
    } else if (this.props.icono) {
      return (
        <button onClick={this.props.onClick} className='Boton Circular'>
          {this.props.icono}
        </button>
      )
    } else return null
  }
}

export default Boton
