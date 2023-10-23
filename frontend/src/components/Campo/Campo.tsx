import "./_campo.scss"
import React, {ReactElement, useState} from "react";
import Select, {ActionMeta, SingleValue} from "react-select";

export enum TipoCampo {
  Texto = "text",
  Email = "email",
  Fecha = "date",
  Desplegable = "select",
  Archivo = "file"
}

type CampoProps = {
  /* Input Props */
  id: string,
  type?: TipoCampo,
  placeholder?: string,
  required?: boolean,
  pattern?: string,
  isMulti?: boolean,
  boton?: React.ReactElement,
  options?: { value: string, label: string }[]
  /* Label Props */
  etiqueta?: string,
  /* Events Props */
  onChange?: ((value: string) => void),
  mensajeError?: string,
}

function Campo(props: CampoProps) {
  const {
    etiqueta,
    onChange,
    mensajeError,
    boton,
    ...inputProps
  } = props
  const [focused, setFocused] = useState(false)

  switch (props.type) {
    case TipoCampo.Texto:
      return inputElement()
    case TipoCampo.Email:
      return inputElement()
    case TipoCampo.Desplegable:
      return selectElement()
  }

  function inputElement(): ReactElement {
    return (
      <div className="w-100 campo">
        {etiqueta ? <label className="form-label" htmlFor={inputProps.id}>{etiqueta}</label> : null}
        <input
          {...inputProps}
          className="form-control"
          aria-selected={focused}
          onBlur={handleFocus}
          onChange={event => {
            if (onChange != null) {
              onChange(event.target.value)
            }
          }}
        />
        {boton}
        <span>{mensajeError}</span>
      </div>
    )
  }

  function selectElement(): ReactElement {
    return (
      <div className="w-100 campo">
        {etiqueta ? <label className="form-label" htmlFor={inputProps.id}>{etiqueta}</label> : null}
        <Select
          {...inputProps}
          onChange={handleChange}
          className={"form-control"}
          classNamePrefix={"select"}
          closeMenuOnSelect={!inputProps.isMulti}
          unstyled={true}
        />
      </div>
    )
  }

  function handleChange(option: SingleValue<any>, actionMeta: ActionMeta<any>) {
    if (props.onChange != null) {
      if (props.isMulti) {
        onSelectChangeMulti(actionMeta)
      } else {
        onSelectChangeSingle(option as SingleValue<{ value: string, label: string }>)
      }
    }
  }

  function handleFocus() {
    setFocused(true)
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

Campo.defaultProps = {
  type: TipoCampo.Texto
}

export default Campo
