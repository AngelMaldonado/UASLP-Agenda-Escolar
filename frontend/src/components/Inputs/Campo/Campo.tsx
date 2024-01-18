// TODO: estilos para invalid Select
// TODO: mensajes de error en select y file

import "./_campo.scss"
import {useState} from "react";
import Select, {ActionMeta, NoticeProps, SingleValue, components} from "react-select";
import CreatableSelect from "react-select/creatable";

export enum TipoCampoTexto {
  Texto = "text",
  Email = "email",
  Enlace = "url"
}

export type CampoProps = {
  id: string,
  etiqueta?: string,
  required?: boolean,
  placeholder?: string,
  onChange?: ((field: string, value: any) => void),
  mensajeError?: string,
}

export type CampoTextoProps = CampoProps & {
  type?: "text" | "email" | "password" | "url",
  value?: string,
  boton?: React.ReactElement,
  pattern?: string,
  maxLength?: number,
}

export type CampoMultiTextoProps = CampoProps & {
  value?: string,
  maxLength?: number,
  rows: number,
}

export type CampoDesplegableProps = CampoProps & {
  value?: any | Array<any>,
  creacional?: boolean,
  options?: { value: any, label: string }[],
  defaultValue?: { value: any, label: string } | { value: any, label: string }[],
  isDisabled?: boolean,
  isSearchable?: boolean,
  closeMenuOnSelect?: boolean,
  isMulti?: boolean,
  components?: {}
}

export type CampoRadiosProps = CampoProps & {
  value?: any,
  options: { value: any, label: string }[]
}

export type CampoArchivoProps = CampoProps & {
  value: File | string,
  accept: string
}

export type CampoFechaProps = CampoProps & {
  onDateChange?: ((field: string, date: Date) => void)
  value: string,
  min?: string,
  max?: string
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
      <div className="flex gap-2">
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
    mensajeError,
    etiqueta,
    creacional,
    ...inputProps
  } = props

  const NoOptionsMessage = (props: NoticeProps) => {
    return (
      <components.NoOptionsMessage {...props} children={"Sin opciones"}/>
    );
  };

  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={inputProps.id}>{etiqueta}</label> : null}
      {creacional ?
        <CreatableSelect
          {...inputProps}
          components={{...inputProps.components, NoOptionsMessage}}
          onCreateOption={(value: string) => handleCreate(value)}
          onChange={handleChange}
          className="form-control"
          classNamePrefix="select"
          closeMenuOnSelect={!inputProps.isMulti}
          unstyled={true}
          formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
        /> :
        <Select
          {...inputProps}
          components={{...inputProps.components, NoOptionsMessage}}
          onChange={handleChange}
          className="form-control"
          classNamePrefix="select"
          closeMenuOnSelect={!inputProps.isMulti}
          unstyled={true}
        />
      }
      <span>{mensajeError}</span>
    </div>
  )

  function handleCreate(inputValue: string) {
    onSelectChangeSingle({value: inputValue, label: inputValue})
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

export function CampoRadios(props: CampoRadiosProps) {
  const {
    value,
    options,
    onChange,
    etiqueta,
    id,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo d-flex gap-2">
      {options.map((option) => (
        <label className="form-control d-flex gap-2" key={"Opcion Radio" + option.label} htmlFor={option.value}>
          <input
            type="radio"
            id={option.value}
            value={value}
            name={id}
            {...inputProps}
            onChange={(event) => {
              if (onChange != null && event.target.checked) {
                onChange(event.target.id, event.target.value)
              }
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}

export function CampoArchivo(props: CampoArchivoProps) {
  const {
    etiqueta,
    onChange,
    mensajeError,
    value,
    ...inputProps
  } = props
  return (
    <div className="w-100 campo">
      {etiqueta ? <label className="form-label" htmlFor={props.id}>{props.etiqueta}</label> : null}
      <label className="form-control" htmlFor={props.id}>
        {placeholder()}
      </label>
      <input
        {...inputProps}
        type="file"
        multiple={false}
        className="visually-hidden"
        onChange={event => {
          if (onChange != null) {
            onChange(event.target.id, event.target.files?.item(0))
          }
        }}
      />
      <span>{mensajeError}</span>
    </div>
  )

  function placeholder() {
    if (typeof value === "string") {
      return props.placeholder
    } else if (value instanceof File) {
      return value.name
    }
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

CampoTexto.valida = (id: string) => {
  return (document.getElementById(id) as HTMLFormElement).reportValidity()
}
