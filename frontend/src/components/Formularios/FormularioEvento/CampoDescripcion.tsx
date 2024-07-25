import Evento from "../../../models/Evento.ts";
import {Form} from "react-bootstrap";
import Formal from "react-formal";

export type CampoDescripcionProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
}

export function CampoDescripcion(props: CampoDescripcionProps) {
  return (
    <>
      <Form.Label htmlFor="descripcion">
        Descripción ({props.evento.descripcion?.length ?? 0}/250)*
      </Form.Label>
      <Formal.Field name="descripcion"
                    as="textarea"
                    className="form-control"
                    placeholder="Escriba la descripción del evento"
                    maxLength={250}
                    rows={3}
                    mapFromValue={{"descripcion": _ => props.evento.descripcion}}
                    mapToValue={_ => props.evento.descripcion}
                    onChange={e => props.setEvento("descripcion", e.target.value)}
      />
      <Formal.Message for="descripcion" className="d-flex text-danger"/>
    </>
  );
}
