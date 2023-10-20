import "./_campo.scss"
import Boton from "../Boton/";
import React, {ReactElement} from "react";
import Select, {ActionMeta, SingleValue} from "react-select";
import {UseFormRegister} from "react-hook-form";

export enum TipoCampo {
  Texto = "text",
  Email = "email",
  Fecha = "date",
  Desplegable = "select",
  Archivo = "file"
}

type CampoProps = {
  id: string,
  tipoCampo: TipoCampo,
  boton?: React.ReactElement<Boton>,
  multi?: boolean,
  onChange?: ((value: string) => void),
  etiqueta?: string,
  opciones?: { value: string, label: string }[]
  requerido?: boolean,
  placeholder?: string,
  register?: UseFormRegister<any>
}

function Campo(props: CampoProps) {
  switch (props.tipoCampo) {
    case TipoCampo.Texto:
      return inputElement()
    case TipoCampo.Email:
      return inputElement()
    case TipoCampo.Desplegable:
      return selectElement()
  }

  function inputElement(): ReactElement {
    return (
      <div className="w-100">
        <label className="form-label" htmlFor={props.id} hidden={props.etiqueta == null}>
          {props.etiqueta}
        </label>
        <input className="form-control"
               title={props.id}
               id={props.id}
               type={props.tipoCampo}
               placeholder={props.placeholder}
               {...props.register != null ? {...props.register("example")} : null}
               onChange={event => {
                 if (props.onChange != null) {
                   props.onChange(event.target.value)
                 }
               }}
        />
        {props.boton}
      </div>
    )
  }

  function selectElement(): ReactElement {
    return (
      <div className="w-100">
        <label className="form-label" htmlFor={props.id} hidden={props.etiqueta == null}>
          {props.etiqueta}
        </label>
        <Select options={props.opciones}
                required={props.requerido}
                closeMenuOnSelect={!props.multi}
                isMulti={props.multi}
                unstyled={true}
                className={"form-control"}
                classNamePrefix={"select"}
                placeholder={props.placeholder}
                onChange={handleChange}
        />
      </div>
    )
  }

  function handleChange(option: SingleValue<any>, actionMeta: ActionMeta<any>) {
    if (props.onChange != null) {
      if (props.multi) {
        onSelectChangeMulti(actionMeta)
      } else {
        onSelectChangeSingle(option as SingleValue<{ value: string, label: string }>)
      }
    }
  }

  function onSelectChangeSingle(option: SingleValue<{ value: string, label: string }>) {
    props.onChange!(option!.value)
  }

  function onSelectChangeMulti(actionMeta: ActionMeta<{ value: string, label: string }>) {
    switch (actionMeta.action) {
      case "select-option":
        props.onChange!(actionMeta.option!.value)
        break
      case "remove-value":
        props.onChange!(actionMeta.removedValue.value)
        break
      case "clear":
        actionMeta.removedValues.forEach(option => {
          props.onChange!(option.value)
        })
        break
    }
  }
}

export default Campo
