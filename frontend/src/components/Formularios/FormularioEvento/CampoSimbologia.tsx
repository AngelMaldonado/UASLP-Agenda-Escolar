import {TipoEventoEnum} from "../../../enums"
import {Form} from "react-bootstrap"
import Formal from "react-formal"
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import Evento from "../../../models/Evento.ts"
import Simbologia from "../../../models/Simbologia.ts"
import {Configuraciones} from "../../../utils/Constantes.ts";

export type CampoSimbologiaProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void),
  simbolos?: Simbologia[]
}

export function CampoSimbologia(props: CampoSimbologiaProps) {
  const Option = (props: OptionProps) => (
    <components.Option {...props} children={
      <img height={30}
           className="w-100 rounded"
           src={Configuraciones.publicURL + props.label}
           alt={"Simbología " + props.label}/>
    }/>
  )

  const SingleValue = (props: SingleValueProps) => (
    <components.SingleValue {...props} children={
      <img height={20}
           className="w-100 rounded"
           src={Configuraciones.publicURL + (props.data! as { label: string }).label}
           alt={"Simbología " + (props.data! as { label: string }).label}/>
    }/>
  )

  if ((props.evento.tipo == TipoEventoEnum.CATALOGO || props.evento.tipo == TipoEventoEnum.FACULTAD) && props.simbolos) {
    return (
      <>
        <Form.Label htmlFor="simbolo_id">Símbolo del evento*</Form.Label>
        <Formal.Field name="simbolo_id"
                      as={Select}
                      className="form-control"
                      classNamePrefix="select"
                      unstyled
                      isSearchable={false}
                      isDisabled={props.evento.tipo == TipoEventoEnum.CATALOGO}
                      components={{SingleValue, Option}}
                      placeholder={props.evento.tipo == TipoEventoEnum.CATALOGO ? "Eliga un evento del catálogo" : "Eliga el símbolo"}
                      options={props.simbolos?.map(value =>
                        ({value: value.id, label: value.simbolo as string}))
                      }
                      mapFromValue={{"simbolo_id": option => (option as { value: number, label: string }).value}}
                      mapToValue={props.evento.simbolo_id ?
                        _ => {
                          const simbologia = props.simbolos?.find(o =>
                            o.id == props.evento.simbolo_id
                          )
                          return {value: simbologia?.id, label: simbologia?.simbolo as string}
                        }
                        : undefined
                      }
                      onChange={(o: { value: number, label: string }) => {
                        props.setEvento("simbolo_id", o.value)
                      }}
        />
        <Formal.Message for="simbolo_id" className="d-flex text-danger"/>
      </>
    )
  } else return null
}
