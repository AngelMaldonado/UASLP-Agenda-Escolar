import "./_formularioEvento.scss"
import CampoTexto, {CampoArchivo, CampoDesplegable, CampoFecha, CampoMultiTexto, TipoCampoTexto} from "../Campo"
import Comunidades, {ComunidadesOption} from "../../models/Comunidades.ts";
import Areas, {AreasOption} from "../../models/Areas.ts";
import Evento from "../../models/Evento.ts"
import CatEvento, {eventos_catalogo_opciones, obten_evento_catalogo_opcion} from "../../models/CatEvento.ts";
import {components, OptionProps} from "react-select";
import Boton from "../Boton";
import {Badge} from "react-bootstrap";
import {FaPlus, FaTimes} from "react-icons/fa";
import {useEffect, useState} from "react";
import {SimbologiaOption, simbologias} from "../../models/Simbologias.ts";

type FormularioNuevoEventoProps = {
  evento: Evento,
  onSingleChange: ((field: string, value: string | Date | number) => void),
  onMultipleChange: ((field: string, value: any) => void),
}

const formNuevoEventoId = "form-nuevo-evento"

function FormularioEvento(props: FormularioNuevoEventoProps) {
  const [nuevoHipervinculo, setNuevoHipervinculo] = useState("")
  const [simbolo, setSimbolo] = useState(simbologias[0])

  useEffect(() => {
    setSimbolo(simbologias.find(s => s.value == props.evento.simbolo) ?? simbologias[0])
  }, [props.evento]);

  const Option = (props: OptionProps<SimbologiaOption>) => (
    <components.Option {...props} children={
      <img height={30} src={props.data.value} className="w-100 rounded"
           alt={"Simbología " + props.label}/>
    }/>
  )
  const SingleValue = (props: OptionProps<SimbologiaOption>) => (
    <components.SingleValue {...props} children={
      <img height={20} src={props.data.value} className="w-100 rounded" alt={"Simbología " + props.label}/>
    }/>
  )

  return (
    <form id={formNuevoEventoId} className="d-flex flex-column gap-2 text-start">
      <CampoDesplegable id="nombre"
                        value={obten_evento_catalogo_opcion(props.evento.cat_evento_id)}
                        options={eventos_catalogo_opciones}
                        placeholder="Nombre"
                        etiqueta="Nombre"
                        required={true}
        /*pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"} // <- Agregar también dígitos*/
                        mensajeError="Seleccione un valor"
                        onChange={(field, value: CatEvento) => {
                          props.onSingleChange(field, value.nombre)
                          props.onSingleChange("simbolo", value.simbolo)
                          props.onSingleChange("descripcion", value.descripcion)
                          props.onSingleChange("cat_evento_id", value.id)
                        }}
      />
      <div className="d-flex gap-2">
        <CampoDesplegable id="simbolo"
                          value={simbolo}
                          options={simbologias}
                          placeholder="Simbología"
                          etiqueta="Simbología"
                          isSearchable={false}
                          onChange={props.onSingleChange}
                          components={{Option, SingleValue}}
                          required={true}
        />
        <CampoArchivo id="imagen"
                      etiqueta="Imagen"
                      onChange={(field, value: File[]) => {
                        props.onSingleChange(field, "/imagenes/" + value[0].name)
                      }}
                      accept="image/png, image/jpg, image/jpeg, image/webp"
        />
      </div>
      <CampoDesplegable id="comunidades"
                        etiqueta="Comunidades"
                        placeholder="Comunidades"
                        defaultValue={obtenComunidades()}
                        options={Comunidades}
                        isMulti={true}
                        required={true}
                        onChange={props.onMultipleChange}
      />
      <CampoDesplegable id="areas"
                        etiqueta="Áreas"
                        placeholder="Áreas"
                        defaultValue={obtenAreas()}
                        required={true}
                        isMulti={true}
                        options={Areas}
                        onChange={props.onMultipleChange}
      />
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
                  pattern={"^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$\n"}
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
    </form>
  );

  function obtenAreas() {
    let areas: AreasOption[] = []
    if (props.evento.areas.length > 0) {
      props.evento.areas.forEach(area => {
        Areas.find(opcion => {
          if (opcion.value == area)
            areas.push(opcion)
        })
      })
    }
    return areas
  }

  function obtenComunidades() {
    let comunidades: ComunidadesOption[] = []
    if (props.evento.comunidades.length > 0) {
      props.evento.comunidades.forEach(comunidad => {
        Comunidades.find(opcion => {
          if (opcion.value == comunidad)
            comunidades.push(opcion)
        })
      })
    }
    return comunidades
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
