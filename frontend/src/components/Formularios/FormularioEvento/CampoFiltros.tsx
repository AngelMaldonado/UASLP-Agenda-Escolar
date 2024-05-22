import {TipoEventoEnum} from "../../../enums"
import {Form} from "react-bootstrap"
import Formal from "react-formal"
import Select from "react-select"
import Evento from "../../../models/Evento.ts"
import Filtro from "../../../models/Filtro.ts"
import {FiltroOptionsType} from "../../../enums/FiltrosEnum.ts";

export type CampoFiltrosProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void),
  filtros: Filtro[]
}

export function CampoFiltros(props: CampoFiltrosProps) {
  const options = props.filtros.map(f => ({
    value: f,
    label: f.nombre
  } as FiltroOptionsType))

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
                    noOptionsMessage={() => <>Sin opciones</>}
                    options={options}
                    mapToValue={props.evento.filtros?.length! > 0 ?
                      v => options?.filter(f => v.filtros?.includes(f.value.id))
                      : undefined}
                    onChange={(e: FiltroOptionsType[]) =>
                      props.setEvento("filtros", e.map(f => f.value.id))
                    }
      />
      <Formal.Message for="filtros" className="d-flex text-danger"/>
    </>)
  else return null
}
