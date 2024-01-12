import Simbologia from "../../../models/Simbologia.ts";
import {CampoArchivo} from "../../Inputs/Campo/";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {Image} from "react-bootstrap";

type FormularioSimboloProps = {
  simbologia: Simbologia,
  onSingleChange: ((field: string, value: string | File) => void),
}

const formSimbolo = "form-simbolo"

function FormularioSimbolo(props: FormularioSimboloProps) {
  return (
    <form id={formSimbolo} className="FormularioSimbolo d-flex flex-column gap-2 text-start">
      <div className="d-flex align-items-end gap-2">
        <CampoArchivo id="simbolo"
                      value={props.simbologia.simbolo as File}
                      etiqueta="Ícono"
                      placeholder="*.png,*jpg"
                      required={props.simbologia.id === null}
                      mensajeError="Agregue un símbolo"
                      onChange={props.onSingleChange}
                      accept={"image/*"}
        />
        {simbolo()}
      </div>
    </form>
  );

  function simbolo() {
    let url = ""
    if (typeof props.simbologia.simbolo === "string" && props.simbologia.simbolo !== "")
      url = Configuraciones.apiURL + props.simbologia.simbolo
    else if (props.simbologia.simbolo instanceof File) {
      url = URL.createObjectURL(props.simbologia.simbolo)
    } else url = "/img-placeholder.svg"

    return <Image thumbnail src={url}/>
  }
}

FormularioSimbolo.valida = () => {
  const formulario = document.getElementById(formSimbolo) as HTMLFormElement
  if (formulario.reportValidity()) {
    const img = (formulario.querySelector('img'))
    if (img!.naturalWidth <= 500 && img!.naturalHeight <= 500)
      return true
    else {
      const span = img!.parentElement!.querySelector('span')!
      span.innerHTML = 'Tamaño máximo de imagen: 500 x 500 pixeles'
      span.style.setProperty('display', 'block')
    }
  }
}

export default FormularioSimbolo
