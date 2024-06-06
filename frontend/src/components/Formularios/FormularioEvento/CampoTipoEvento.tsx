import {Form} from "react-bootstrap";
import Formal from "react-formal";
import Select from "react-select";
import {TipoEventoOptions, TipoEventoOptionsType} from "../../../enums";
import Evento from "../../../models/Evento.ts";

export type CampoTipoEventoProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
}

export function CampoTipoEvento(props: CampoTipoEventoProps) {
  return (
    <>
      <Form.Label>Tipo de evento*</Form.Label>
      <Formal.Field name="tipo"
                    as={Select}
                    className="form-control"
                    classNamePrefix="select"
                    unstyled
                    placeholder="Eliga el tipo de evento"
                    noOptionsMessage={() => <>Sin opciones</>}
                    options={TipoEventoOptions}
                    mapFromValue={{"tipo": option => (option as TipoEventoOptionsType).value}}
                    mapToValue={props.evento.tipo ?
                      v =>
                        TipoEventoOptions.find(o => o.value == v.tipo)
                      : undefined
                    }
                    onChange={(o: TipoEventoOptionsType) => props.setEvento("tipo", o.value)}
      />
      <Formal.Message for="tipo" className="d-flex text-danger"/>
    </>
  );
}
