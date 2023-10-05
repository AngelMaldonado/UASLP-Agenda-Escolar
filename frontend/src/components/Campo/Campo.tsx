import './Campo.css'
import Boton from "../Boton/";
import React from "react";

enum TipoCampo {
  Text,
  RichText,
  ComboBox,
  File
}

interface CampoProps {
  id: string,
  tipoCampo: TipoCampo,
  etiqueta?: string,
  placeholder?: string,
  boton?: React.ReactElement<Boton>,
  archivos?: string
}

function Campo(props: CampoProps) {
  switch (props.tipoCampo) {
    case TipoCampo.Text:
      return (
        <div className={'Campo' + (props.boton ? ' Campo-boton' : ' ')}>
          {props.etiqueta ? <label htmlFor={props.id}>{props.etiqueta}</label> : null}
          <input id={props.id} name={props.id} type="text" placeholder={props.placeholder}/>
          {props.boton ? props.boton : null}
        </div>
      )
    case TipoCampo.File:
      return (
        <div className={'Campo' + (props.boton ? ' Campo-boton' : ' ')}>
          {props.etiqueta ? <label htmlFor={props.id}>{props.etiqueta}</label> : null}
          <input id={props.id} name={props.id} type="file" accept={props.archivos}/>
          {props.boton ? props.boton : null}
        </div>
      )
    default:
      return null
  }
}

export {Campo, TipoCampo}
