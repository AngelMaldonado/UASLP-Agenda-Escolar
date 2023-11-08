import "./_formularioEvento.scss"
import CampoTexto, {CampoArchivo, CampoDesplegable, CampoFecha, CampoMultiTexto} from "../Campo"
import Comunidades from "../../models/Comunidades.ts";
import Areas from "../../models/Areas.ts";
import Evento from "../../models/Evento.ts"
import CatEvento, {eventos_catalogo_opciones} from "../../models/CatEvento.ts";
import {components, OptionProps} from "react-select";
import Boton from "../Boton";
import {Badge} from "react-bootstrap";
import {FaPlus, FaTimes} from "react-icons/fa";
import {useState} from "react";
import {SimbologiaOption, simbologias} from "../../models/Simbologias.ts";

type FormularioEventoProps = {
  evento: Evento,
  onSingleChange: ((field: string, value: string | Date | CatEvento) => void),
  onMultipleChange: ((field: string, value: any) => void),
}

const formNuevoEventoId = "form-nuevo-evento"

function NuevoEvento(props: FormularioEventoProps) {
  const [nuevoHipervinculo, setNuevoHipervinculo] = useState("")

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
                        value={props.evento.nombre}
                        options={eventos_catalogo_opciones}
                        placeholder="Nombre"
                        etiqueta="Nombre"
                        required={true}
        /*pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"} // <- Agregar también dígitos*/
                        mensajeError="Ingrese nombre(s) válido (A-Z, a-z, 0-9 máx 100)"
                        onChange={(field, value: CatEvento) => {
                          props.onSingleChange(field, value.nombre)
                          props.onSingleChange("simbolo", value.simbolo)
                          props.onSingleChange("cat_evento", value)
                        }}
      />
      <div className="d-flex gap-2">
        <CampoDesplegable id="simbolo"
                          value={props.evento.simbolo}
                          options={simbologias}
                          placeholder="Simbología"
                          etiqueta="Simbología"
                          isSearchable={false}
                          components={{Option, SingleValue}}
                          required={true}
                          onChange={props.onSingleChange}
        />
        <CampoArchivo id="imagen"
                      etiqueta="Imagen"
                      onChange={props.onSingleChange}
                      accept="image/png, image/jpg, image/jpeg, image/webp"
        />
      </div>
      <CampoDesplegable id="comunidades"
                        etiqueta="Comunidades"
                        placeholder="Comunidades"
                        options={Comunidades}
                        isMulti={true}
                        required={true}
                        onChange={props.onMultipleChange}
      />
      <CampoDesplegable id="areas"
                        etiqueta="Áreas"
                        placeholder="Áreas"
                        required={true}
                        isMulti={true}
                        options={Areas}
                        onChange={props.onMultipleChange}
      />
      <div className="d-flex gap-2">
        <CampoFecha id="fecha_inicio"
                    value={props.evento.fecha_inicio.toISOString().split("T")[0]}
                    etiqueta="Fecha Inicio"
                    placeholder="Fecha Inicio"
                    onDateChange={props.onSingleChange}
                    max={"2023/01/01"}
                    min={"2024/01/01"}
        />
        <CampoFecha id="fecha_fin"
                    value={props.evento.fecha_fin.toISOString().split("T")[0]}
                    etiqueta="Fecha Fin"
                    placeholder="Fecha Fin"
                    onDateChange={props.onSingleChange}
                    max={"2023/01/01"}
                    min={"2024/01/01"}
        />
      </div>
      <CampoTexto id={"link"}
                  value={nuevoHipervinculo}
                  onChange={(_, value) => setNuevoHipervinculo(value)}
                  etiqueta="Hipervínculos"
                  boton={<Boton icono={<FaPlus/>}
                                onClick={() => props.onMultipleChange("hipervinculos", nuevoHipervinculo)}/>}/>
      {muestraHipervinculos()}
      <CampoMultiTexto id="descripcion"
                       value={props.evento.descripcion}
                       etiqueta="Descripción"
                       placeholder="Descripción"
                       onChange={props.onSingleChange}
                       rows={3}
      />
    </form>
  );

  function muestraHipervinculos() {
    if (props.evento.hipervinculos.length > 0) {
      return (
        <div className="d-flex flex-wrap gap-2">
          {props.evento.hipervinculos.map((hipervinculo, index) => (
            <Badge key={"link-" + index}
                   onClick={() => props.onMultipleChange("hipervinculos", hipervinculo)}>{hipervinculo} <FaTimes/>
            </Badge>
          ))}
        </div>
      )
    } else {
      return null
    }
  }
}

NuevoEvento.valida = () => {
  return (document.getElementById(formNuevoEventoId) as HTMLFormElement).reportValidity()
}

export default NuevoEvento
