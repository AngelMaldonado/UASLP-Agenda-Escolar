import Simbologia from "../../../models/Simbologia.ts";
import {Configuraciones} from "../../../utils/Constantes.ts";
import {Form, Image} from "react-bootstrap";
import {useState} from "react";
import Formal from "react-formal";
import img_placeholder from "../../../assets/img_placeholder.svg"

type FormularioSimboloProps = {
  simbologia: Simbologia,
  setSimbolo: ((field: string, value: string | File) => void),
  errores: object,
}

function FormularioSimbolo(props: FormularioSimboloProps) {
  const [errores, setErrores] = useState({})

  return (
    <Formal schema={Simbologia.schema}
            defaultValue={props.simbologia}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}>
      <span className="text-muted fst-italic">Campos requeridos *</span>
      <Form.Group>
        <Form.Label htmlFor="simbolo">Símbolo*</Form.Label>
        <div className="d-flex align-items-end gap-2">
          <label className="form-control d-flex justify-content-between">
            {props.simbologia.simbolo && props.simbologia instanceof File ?
              (props.simbologia.simbolo as File).name : "Símbolo en formato .webp"
            }
            <Formal.Field name="simbolo"
                          type="file"
                          accept=".webp"
                          className="visually-hidden"
                          onChange={e => props.setSimbolo("simbolo", e.target.files[0])}
            />
          </label>
          {simbolo()}
        </div>
        <Formal.Message for="simbolo" className="d-flex text-danger"/>
      </Form.Group>
    </Formal>
  );

  function simbolo() {
    let url = ""
    if (props.simbologia.simbolo instanceof File)
      url = URL.createObjectURL(props.simbologia.simbolo)
    else if (props.simbologia.simbolo && typeof props.simbologia.simbolo == "string")
      url = Configuraciones.publicURL + props.simbologia.simbolo
    else
      url = img_placeholder

    return <Image thumbnail width={40} src={url}/>
  }
}

export default FormularioSimbolo
