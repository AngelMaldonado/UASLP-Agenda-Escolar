import Evento from "../../../models/Evento.ts"
import {Form} from "react-bootstrap";
import Formal from "react-formal";

export type CampoFechasProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
}

export function CampoFechas(props: CampoFechasProps) {
  return (
    <div className="d-flex gap-2">
      <div className="w-100">
        <Form.Label htmlFor="fecha_inicio">Fecha de inicio*</Form.Label>
        <Formal.Field name="fecha_inicio"
                      type="date"
                      lang="es-MX"
                      className="form-control"
                      placeholder="Fecha de inicio del evento"
                      mapToValue={_ => props.evento.fecha_inicio?.toISOString().split("T")[0]}
                      mapFromValue={{"fecha_inicio": v => v}}
                      onChange={e => props.setEvento("fecha_inicio", new Date(e.target.value))}
        />
        <Formal.Message for="fecha_inicio" className="d-flex text-danger"/>
      </div>
      <div className="w-100">
        <Form.Label htmlFor="fecha_fin">Fecha de fin*</Form.Label>
        <Formal.Field name="fecha_fin"
                      type="date"
                      lang="es-MX"
                      className="form-control"
                      placeholder="Fecha de fin del evento"
                      min={props.evento.fecha_inicio?.toISOString().split("T")[0]}
                      mapToValue={_ => props.evento.fecha_fin?.toISOString().split("T")[0]}
                      mapFromValue={{"fecha_fin": v => v}}
                      onChange={e => props.setEvento("fecha_fin", new Date(e.target.value))}
        />
        <Formal.Message for="fecha_fin" className="d-flex text-danger"/>
      </div>
    </div>
  )
}
