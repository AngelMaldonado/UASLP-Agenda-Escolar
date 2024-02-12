import Evento from "../../../models/Evento.ts"
import {Badge, Form} from "react-bootstrap";
import Formal, {FieldArrayHelpers} from "react-formal";
import Boton from "../../Inputs/Boton";
import {FaPlus, FaTimes} from "react-icons/fa";
import {FieldErrors} from "react-hook-form";

export type CampoHipervinculosProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
}

export function CampoHipervinculos(props: CampoHipervinculosProps) {
  return (
    <>
      <Form.Label
        htmlFor="hipervinculos">
        Hipervínculos ({props.evento.hipervinculos?.filter(f => f != "").length}/5)
      </Form.Label>
      <Formal.FieldArray name="hipervinculos">
        {(values, helpers, meta) => (
          <>
            <div className="d-flex gap-2">
              <Formal.Field name={`hipervinculos[0]`}
                            className="form-control"
                            placeholder="https://www.dominio.com"/>
              <Boton icono={<FaPlus/>} onClick={() => {
                if (props.evento.hipervinculos!.length! < 5)
                  meta.schema?.validate(values)
                    .then(_ => {
                      helpers.insert("", 0)
                      props.setEvento("hipervinculos", values.filter(v => v != ""))
                    })
                    .catch((e: FieldErrors) => console.log(e))
              }}/>
            </div>
            <Formal.Message for={`hipervinculos[0]`} className="d-flex text-danger"/>
            {hipervinculos(values, helpers)}
          </>
        )}
      </Formal.FieldArray>
    </>
  )

  function hipervinculos(values: any[], helpers: FieldArrayHelpers) {
    if (props.evento.hipervinculos!.length > 0 && props.evento.hipervinculos![0] != "") {
      return (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {props.evento.hipervinculos!.map((hipervinculo, index) => (
            <Badge key={"link-" + index}
                   onClick={() => {
                     helpers.remove(hipervinculo)
                     props.setEvento("hipervinculos", values.filter(v => v != ""))
                   }}
            >
              {hipervinculo}
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
