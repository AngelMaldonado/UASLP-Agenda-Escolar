import "./_formulario-evento.scss"
import CampoTexto, {
  CampoArchivo,
  CampoDesplegable,
  CampoFecha,
  CampoMultiTexto,
  TipoCampoTexto
} from "../../Inputs/Campo"
import Evento from "../../../models/Evento.ts"
import Boton from "../../Inputs/Boton";
import {Badge} from "react-bootstrap";
import {FaPlus, FaTimes} from "react-icons/fa";
import {useState} from "react";
import {useObtenCatEventos} from "../../../hooks/HookCatEvento.ts";
import {components, OptionProps} from "react-select";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {useObtenSimbolos} from "../../../hooks/HooksSimbolo.ts";
import {useObtenFiltros} from "../../../hooks/HooksFiltro.ts";

type FormularioNuevoEventoProps = {
  evento: Evento,
  onSingleChange: ((field: string, value: string | Date | number | null) => void),
  onMultipleChange: ((field: string, value: any) => void),
}

const formNuevoEventoId = "form-nuevo-evento"

function FormularioEvento(props: FormularioNuevoEventoProps) {
  const [nuevoHipervinculo, setNuevoHipervinculo] = useState("")

  const {cat_eventos} = useObtenCatEventos()
  const {simbolos} = useObtenSimbolos()
  const {filtros} = useObtenFiltros()

  const Option = (props: OptionProps<{ value: number, label: string }>) => (
    <components.Option {...props} children={
      <img height={30}
           className="w-100 rounded"
           src={Configuraciones.apiURL + props.label}
           alt={"Simbología " + props.label}/>
    }/>
  )

  const SingleValue = (props: OptionProps<{ value: number, label: string }>) => (
    <components.SingleValue {...props} children={
      <img height={20}
           className="w-100 rounded"
           src={Configuraciones.apiURL + props.data.label}
           alt={"Simbología " + props.data.label}/>
    }/>
  )

  return (
    <form id={formNuevoEventoId} className="d-flex flex-column gap-2 text-start">
      {tipoEvento()}
      {camposTipoEvento()}
      {campos()}
    </form>
  );

  function tipoEvento() {
    return (
      <CampoDesplegable id="tipo"
                        required
                        value={
                          props.evento.tipo ? {
                            value: props.evento.tipo,
                            label: props.evento.tipo[0].toUpperCase() + props.evento.tipo.substring(1)
                          } : null
                        }
                        options={[
                          {value: 'catalogo', label: 'Catálogo'},
                          {value: 'facultad', label: 'Facultad'},
                          {value: 'alumnado', label: 'Alumnado'},
                        ]}
                        placeholder="Tipo de evento"
                        etiqueta="Tipo de evento"
                        onChange={props.onSingleChange}
      />
    )
  }

  function camposTipoEvento() {
    if (props.evento.tipo === 'catalogo' && cat_eventos) {
      const cat_evento = props.evento.cat_evento_id ?
        cat_eventos.find(e => e.id === props.evento.cat_evento_id) : undefined
      return (
        <CampoDesplegable id="cat_evento_id"
                          creacional={true}
                          value={cat_evento ? {value: cat_evento.id, label: cat_evento.nombre} : null}
                          options={cat_eventos.map((value) => ({value: value.id, label: value.nombre}))}
                          placeholder="Seleccione un evento del catálogo"
                          etiqueta="Evento"
                          required={true}
                          onChange={(field, value) => {
                            const cat_evento = cat_eventos.find(e => e.id === value)
                            props.onSingleChange('simbolo_id', cat_evento!.id)
                            props.onSingleChange('descripcion', cat_evento!.descripcion)
                            props.onSingleChange(field, value)
                          }}
        />
      )
    } else if (props.evento.tipo === 'alumnado' || props.evento.tipo === 'facultad') {
      return (
        <CampoTexto id="nombre"
                    required
                    maxLength={100}
                    value={props.evento.nombre}
                    type={TipoCampoTexto.Texto}
                    etiqueta="Nombre"
                    placeholder="Nombre"
                    onChange={props.onSingleChange}
                    pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
                    mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 100)"
        />
      )
    }
  }

  function simbologia() {
    if ((props.evento.tipo === 'catalogo' || props.evento.tipo === 'facultad') && simbolos) {
      return (
        <CampoDesplegable id="simbolo_id"
                          required
                          isSearchable={false}
                          isDisabled={props.evento.tipo === 'catalogo'}
                          value={obtenSimbolo()}
                          options={simbolos?.map(value => ({value: value.id, label: value.simbolo as string}))}
                          placeholder="Simbología"
                          etiqueta="Simbología"
                          onChange={props.onSingleChange}
                          components={{Option, SingleValue}}
        />
      )
    } else return null
  }

  function campos() {
    return (
      <>
        <div className="d-flex gap-2">
          {simbologia()}
          <CampoArchivo id="imagen"
                        value={props.evento.imagen ? props.evento.imagen as File : ""}
                        placeholder="*.webp"
                        etiqueta="Imagen"
                        onChange={props.onSingleChange}
                        accept="image/webp"//accept="image/png, image/jpg, image/jpeg, image/webp"
          />
        </div>
        {props.evento.tipo === "catalogo" || props.evento.tipo === "facultad" ?
          (<CampoDesplegable id="filtros"
                             isMulti
                             required
                             defaultValue={obtenFiltros()}
                             options={filtros?.map(value => ({value: value.id, label: value.nombre}))}
                             etiqueta="Filtros"
                             placeholder="Filtros"
                             onChange={props.onMultipleChange}
          />) : null
        }
        <div className="d-flex gap-2">
          <CampoFecha id="fecha_inicio"
                      value={props.evento.fecha_inicio.toISOString().split("T")[0]}
                      etiqueta="Fecha Inicio"
                      required={true}
                      placeholder="Fecha Inicio"
                      onDateChange={(field, date) => {
                        props.onSingleChange(field, date)
                        props.onSingleChange("fecha_fin", date)
                      }}
          />
          <CampoFecha id="fecha_fin"
                      value={props.evento.fecha_fin.toISOString().split("T")[0]}
                      etiqueta="Fecha Fin"
                      required={true}
                      placeholder="Fecha Fin"
                      onDateChange={props.onSingleChange}
                      min={props.evento.fecha_inicio.toISOString().split("T")[0]}
          />
        </div>
        <CampoTexto id={"link"}
                    type={TipoCampoTexto.Enlace}
                    value={nuevoHipervinculo}
                    placeholder="https://www.dominio.com"
                    onChange={(_, value) => setNuevoHipervinculo(value)}
                    mensajeError={"Ingrese una URL válida (https://www.ejemplo.com)"}
                    etiqueta={"Hipervínculos (" + props.evento.hipervinculos.length + "/5)"}
                    boton={
                      <Boton icono={<FaPlus/>}
                             onClick={() => {
                               if (CampoTexto.valida("link") && nuevoHipervinculo != "" && props.evento.hipervinculos.length < 5) {
                                 props.onMultipleChange("hipervinculos", nuevoHipervinculo)
                                 setNuevoHipervinculo("")
                               }
                             }}
                      />}
        />
        {muestraHipervinculos()}
        <CampoMultiTexto id="descripcion"
                         value={props.evento.descripcion}
                         etiqueta={"Descripción (" + props.evento.descripcion.length + "/250)"}
                         placeholder="Descripción"
                         maxLength={250}
                         required={true}
                         mensajeError="Campo obligatorio"
                         onChange={props.onSingleChange}
                         rows={3}
        />
      </>
    )
  }

  function obtenSimbolo() {
    if (props.evento.tipo == 'catalogo') {
      // Busca el evento del catálogo
      const cat_evento = cat_eventos?.find(c => c.id === props.evento.cat_evento_id)
      // Busca el símbolo correspondiente al catálogo
      const simbolo = simbolos?.find(s => s.id === cat_evento?.simbolo_id)
      if (simbolo)
        return {value: simbolo.id, label: simbolo.simbolo as string}
    } else if (props.evento.tipo == 'facultad') {
      // Busca el símbolo
      const simbolo = props.evento.simbolo_id ?
        simbolos?.find(s => s.id === (props.evento.simbolo_id as number)) : undefined
      if (simbolo)
        return {value: simbolo.id, label: simbolo.simbolo as string}
    }
    return null
  }

  function obtenFiltros() {
    let filtrosOpciones: { value: number, label: string }[] = []
    if (props.evento.filtros && filtros) {
      props.evento.filtros.forEach(filtro => {
        filtros.find(f => {
          if (f.id == filtro)
            filtrosOpciones.push({value: filtro, label: f.nombre})
        })
      })
    }
    return filtrosOpciones
  }

  function muestraHipervinculos() {
    if (props.evento.hipervinculos.length > 0) {
      return (
        <div className="d-flex flex-wrap gap-2">
          {props.evento.hipervinculos.map((hipervinculo, index) => (
            <Badge key={"link-" + index}
                   onClick={() => props.onMultipleChange("hipervinculos", hipervinculo)}>{hipervinculo}
              <FaTimes/>
            </Badge>
          ))}
        </div>
      )
    } else {
      return null
    }
  }
}

FormularioEvento.valida = () => {
  return (document.getElementById(formNuevoEventoId) as HTMLFormElement).reportValidity()
}

export default FormularioEvento
