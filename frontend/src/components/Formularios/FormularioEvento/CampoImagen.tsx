import {Form, Image} from "react-bootstrap";
import Formal from "react-formal";
import Evento from "../../../models/Evento.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";

export type CampoImagenProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void)
}

export function CampoImagen(props: CampoImagenProps) {
  return (
    <>
      <Form.Label htmlFor="imagen">Imagen</Form.Label>
      <div className="d-flex align-items-end gap-2">
        <label className="form-control d-flex justify-content-between">
          {props.evento.imagen && props.evento.imagen instanceof File ?
            props.evento.imagen.name : "Imagen en formato .webp"
          }
          <Formal.Field name="imagen"
                        type="file"
                        accept=".webp"
                        className="visually-hidden"
                        onChange={e => props.setEvento("imagen", e.target.files[0])}
          />
        </label>
        {imagen()}
      </div>
      <Formal.Message for="imagen" className="d-flex text-danger"/>
    </>
  );

  function imagen() {
    let url = ""
    if (props.evento.imagen instanceof File)
      url = URL.createObjectURL(props.evento.imagen)
    else if (props.evento.imagen && typeof props.evento.imagen == "string")
      url = Configuraciones.publicURL + props.evento.imagen
    else
      url = "/img-placeholder.svg"

    return <Image thumbnail width={40} src={url}/>
  }
}
