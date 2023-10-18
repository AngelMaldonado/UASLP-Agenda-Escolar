import "./_campo.scss"
import Boton from "../Boton/";
import React, {ReactElement} from "react";
import Select from "react-select";

export enum TipoCampo {
  Texto = "text",
  Fecha = "date",
  Desplegable = "select",
  Archivo = "file"
}

export interface CampoProps {
  id: string,
  tipoCampo: TipoCampo,
  etiqueta?: string,
  placeholder?: string,
  boton?: React.ReactElement<Boton>,
  archivos?: string
}

class Campo extends React.Component<CampoProps> {
  static defaultProps = {tipoCampo: TipoCampo.Texto}
  options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ]

  render() {
    switch (this.props.tipoCampo) {
      case TipoCampo.Texto:
        return this.inputElement()
      case TipoCampo.Desplegable:
        return this.selectElement()
    }
  }

  private inputElement(): ReactElement {
    return (
      <div className="w-100">
        <label className="form-label" htmlFor={this.props.id} hidden={this.props.etiqueta == null}>
          {this.props.etiqueta}
        </label>
        <input className="form-control"
               title={this.props.id}
               id={this.props.id} name={this.props.id}
               type={this.props.tipoCampo}
               placeholder={this.props.placeholder}
        />
        {this.props.boton}
      </div>
    )
  }

  private selectElement(): ReactElement {
    return (
      <div className="w-100">
        <label className="form-label" htmlFor={this.props.id} hidden={this.props.etiqueta == null}>
          {this.props.etiqueta}
        </label>
        <Select options={this.options}
                unstyled={true}
                className={"form-control"}
                classNamePrefix={"select"}
                onFocus={(e) => console.log(e.currentTarget)}
        />
      </div>
    )
  }
}

export default Campo
