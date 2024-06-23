import Evento from "../../../models/Evento.ts"
import {Badge, Form} from "react-bootstrap";
import Formal from "react-formal";
import Boton from "../../Inputs/Boton";
import {FaPlus, FaTimes} from "react-icons/fa";
import {string, ValidationError} from "yup";

export type CampoHipervinculosProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
  setErrores: (({}) => void)
}

export function CampoHipervinculos(props: CampoHipervinculosProps) {
  const {evento, setErrores, setEvento} = props

  return (
    <>
      <Form.Label
        htmlFor="hipervinculos">
        Hipervínculos ({evento.hipervinculos ? evento.hipervinculos.length : 0}/5)
      </Form.Label>
      <div className="d-flex gap-2">
        <Formal.Field name={"hipervinculo"}
                      className="form-control"
                      placeholder="https://www.dominio.com"
                      onChange={e => props.setEvento("hipervinculo", e.target.value)}
        />
     <Boton
  icono={<FaPlus />}
  onClick={() => {
    if (evento?.hipervinculos?.length < 6) {
      string().url().validate(evento.hipervinculo)
        .then(_ => {
          Evento.schema.validateAt("hipervinculos", evento.hipervinculos)
            .then(_ => {
              setEvento("hipervinculos", evento.hipervinculos?.concat(evento.hipervinculo))
              setEvento("hipervinculo", "")
            })
            .catch((error: ValidationError) => setErrores({[error.path!]: error.errors}))
        })
    } else {
      // Mostrar un mensaje o realizar alguna otra acción
      //"Se ha alcanzado el límite de hipervínculos";
    }
  }}
  disabled={evento?.hipervinculos?.length >= 5}
/>

      </div>
      <Formal.Message for="hipervinculo" className="d-flex text-danger"/>
      <Formal.Message for="hipervinculos" className="d-flex text-danger"/>
      {hipervinculos()}
    </>
  )

  function hipervinculos() {
    if (evento.hipervinculos && evento.hipervinculos.length > 0) {
      return (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {props.evento.hipervinculos!.map((hipervinculo, index) => (
           <Badge key={"link-" + index}
                  className="hipervinculo"
                  onClick={() => {
                    setEvento("hipervinculos", evento.hipervinculos?.filter(h => h != hipervinculo))
                    }}
            >
              <div className="d-flex align-items-center">
                <div style={{ overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap', 
                              maxWidth: '56vh'
                }}>
                  {hipervinculo}
                </div>
                <FaTimes/>
              </div>
            </Badge>
          ))}
        </div>
      )
    } else {
      return null
    }
  }
}
