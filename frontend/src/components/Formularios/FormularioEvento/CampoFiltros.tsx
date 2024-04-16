import {TipoEventoEnum} from "../../../enums"
import {Form} from "react-bootstrap"
import Formal from "react-formal"
import Select from "react-select"
import Evento from "../../../models/Evento.ts"
import Filtro from "../../../models/Filtro.ts"

export type CampoFiltrosProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void),
  filtros?: Filtro[]
}

export function CampoFiltros(props: CampoFiltrosProps) {
  if (props.evento.tipo == TipoEventoEnum.CATALOGO || props.evento.tipo == TipoEventoEnum.FACULTAD)
    return (<>
      <Form.Label htmlFor="filtros">Filtros*</Form.Label>
      <Formal.Field name="filtros"
                    as={Select}
                    className="form-control"
                    classNamePrefix="select"
                    unstyled
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Eliga los filtros para el evento"
                    value={props.evento.filtros ?
                      props.filtros?.filter(f => props.evento.filtros?.includes(f.id!))
                        .map(f => ({value: f.id, label: f.nombre}))
                      : undefined}
                    options={props.filtros?.map(o => ({value: o.id!, label: o.nombre!}))}
                    onChange={(e: { value: number, label: string }[]) => {
                      props.setEvento("filtros", e.map(p => p.value))
                    }}
      />
      <Formal.Message for="filtros" className="d-flex text-danger"/>
    </>)
  else return null
}
