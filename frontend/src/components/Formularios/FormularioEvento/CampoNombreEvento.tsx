import Evento from "../../../models/Evento.ts"
import {TipoEventoEnum} from "../../../enums";
import {Form} from "react-bootstrap";
import Formal from "react-formal";
import Select from "react-select";
import CatEvento from "../../../models/CatEvento.ts"

export type CampoNombreEventoProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void),
  cat_eventos?: CatEvento[]
}

export function CampoNombreEvento(props: CampoNombreEventoProps) {
  if (props.evento.tipo == TipoEventoEnum.CATALOGO && props.cat_eventos) {
    return (
      <>
        <Form.Label htmlFor="cat_evento_id">Evento de catálogo*</Form.Label>
        <Formal.Field name="cat_evento_id"
                      as={Select}
                      className="form-control"
                      classNamePrefix="select"
                      unstyled
                      placeholder="Eliga un evento del catálogo"
                      options={props.cat_eventos.map(e => ({value: e.id, label: e.nombre}))}
                      mapFromValue={{"cat_evento_id": o => (o as { value: number, label: string }).value}}
                      mapToValue={props.evento.cat_evento_id ?
                        _ => {
                          const cat_evento = (props.cat_eventos?.find(e =>
                            e.id == props.evento.cat_evento_id
                          ))
                          return {value: cat_evento!.id, label: cat_evento!.nombre}
                        } : undefined
                      }
                      onChange={(o: { value: number, label: string }) => {
                        const cat_evento = props.cat_eventos?.find(e => e.id == o.value)
                        props.setEvento("cat_evento_id", cat_evento!.id)
                        props.setEvento("simbolo_id", cat_evento!.simbolo_id)
                        props.setEvento("descripcion", cat_evento!.descripcion)
                      }}
        />
        <Formal.Message for="cat_evento_id" className="d-flex text-danger"/>
      </>
    )
  } else if (props.evento.tipo == TipoEventoEnum.ALUMNADO || props.evento.tipo == TipoEventoEnum.FACULTAD) {
    return (
      <>
        <Form.Label htmlFor="nombre">Nombre del evento*</Form.Label>
        <Formal.Field name="nombre"
                      className="form-control"
                      placeholder="Escriba el nombre del evento (máx 100)"
                      onChange={e => props.setEvento("nombre", e.target.value)}
        />
        <Formal.Message for="nombre" className="d-flex text-danger"/>
      </>
    )
  }
}
