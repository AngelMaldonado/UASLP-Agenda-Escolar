import "./_campo.scss"
import {useState} from "react";
import Select, {ActionMeta, SingleValue} from "react-select";

export enum TipoCampoTexto {
  Texto = "text",
  Email = "email"
}

export type SelectOption = { label: string, value: string }

export type CampoProps = {
  id: string,
  etiqueta?: string,
  required?: boolean,
  placeholder?: string,
  onChange?: ((field: string, value: string) => void),
  mensajeError?: string,
}

export type CampoTextoProps = CampoProps & {
  type?: "text" | "email" | "password" | "file",
  value?: string,
  boton?: React.ReactElement,
  pattern?: string,
}

export type CampoMultiTextoProps = CampoProps & {
  value?: string,
  rows: number,
}

export type CampoDesplegableProps = CampoProps & {
  value?: string | Array<string>,
  options?: { label: string, value: string }[],
  isSearchable?: boolean,
  closeMenuOnSelect?: boolean,
  isMulti?: boolean,
  components?: {}
}

export type CampoArchivoProps = CampoProps & {
  accept: string
}

export type CampoFechaProps = CampoProps & {
  onDateChange?: ((field: string, date: Date) => void)
  value: string,
  min: string,
  max: string
}

export default function CampoTexto(props: CampoTextoProps) {
  const [focused, setFocused] = useState(false)
  const {
    etiqueta,
    onChange,
    mensajeError,
    boton,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={props.id}>{props.etiqueta}</label> : null}
      <div className="d-flex position-relative">
        <input
          {...inputProps}
          className="form-control"
          aria-selected={focused}
          onBlur={handleFocus}
          onChange={event => {
            if (onChange != null) {
              onChange(event.target.id, event.target.value)
            }
          }}
        />
        {boton}
      </div>
      <span>{mensajeError}</span>
    </div>
  )

  function handleFocus() {
    setFocused(true)
  }
}

export function CampoMultiTexto(props: CampoMultiTextoProps) {
  const [focused, setFocused] = useState(false)
  const {
    etiqueta,
    onChange,
    mensajeError,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={props.id}>{props.etiqueta}</label> : null}
      <textarea
        {...inputProps}
        className="form-control"
        aria-selected={focused}
        onBlur={handleFocus}
        onChange={event => {
          if (onChange != null) {
            onChange(event.target.id, event.target.value)
          }
        }}
      />
      <span>{mensajeError}</span>
    </div>
  )

  function handleFocus() {
    setFocused(true)
  }
}

export function CampoDesplegable(props: CampoDesplegableProps) {
  const {
    etiqueta,
    value,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={inputProps.id}>{etiqueta}</label> : null}
      <Select
        {...inputProps}
        defaultValue={value ? getDefaultSelectedOptions() : null}
        onChange={handleChange}
        className={"form-control"}
        classNamePrefix={"select"}
        closeMenuOnSelect={!inputProps.isMulti}
        unstyled={true}
      />
    </div>
  )

  function getDefaultSelectedOptions(): SelectOption[] | SelectOption {
    if (inputProps.isMulti) {
      return [...(value as string[]).map((s: string): SelectOption => ({label: s, value: s}))]
    } else {
      return {label: (value as string), value: (value as string)}
    }
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

  function onSelectChangeSingle(option: SingleValue<{ value: string, label: string }>) {
    props.onChange!(props.id, option!.value)
  }

  function onSelectChangeMulti(actionMeta: ActionMeta<{ value: string, label: string }>) {
    switch (actionMeta.action) {
      case "select-option":
        props.onChange!(props.id, actionMeta.option!.value)
        break
      case "remove-value":
        props.onChange!(props.id, actionMeta.removedValue.value)
        break
      case "clear":
        actionMeta.removedValues.forEach(option => {
          props.onChange!(props.id, option.value)
        })
        break
    }
  }
}

export function CampoArchivo(props: CampoArchivoProps) {
  const [focused, setFocused] = useState(false)
  const {
    etiqueta,
    onChange,
    mensajeError,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={props.id}>{props.etiqueta}</label> : null}
      <input
        {...inputProps}
        type="file"
        className="form-control"
        aria-selected={focused}
        onBlur={handleFocus}
        onChange={event => {
          if (onChange != null) {
            onChange(event.target.id, event.target.value)
          }
        }}
      />
      <span>{mensajeError}</span>
    </div>
  )

  function handleFocus() {
    setFocused(true)
  }
}

export function CampoFecha(props: CampoFechaProps) {
  const [focused, setFocused] = useState(false)
  const {
    etiqueta,
    onChange,
    onDateChange,
    mensajeError,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={props.id}>{props.etiqueta}</label> : null}
      <input
        {...inputProps}
        type="date"
        className="form-control"
        aria-selected={focused}
        onBlur={handleFocus}
        onChange={event => {
          if (onDateChange != null) {
            console.log(event.target.value.toLocaleLowerCase().toString())
            onDateChange(event.target.id, new Date(event.target.value))
          }
        }}
      />
      <span>{mensajeError}</span>
    </div>
  )

  function handleFocus() {
    setFocused(true)
  }
}
