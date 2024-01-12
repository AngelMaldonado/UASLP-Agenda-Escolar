import "./_formulario-filtro.scss"
import Campo, {CampoArchivo, CampoDesplegable, TipoCampoTexto} from "../../Inputs/Campo";
import Filtro from "../../../models/Filtro.ts";
import {Image} from "react-bootstrap";
import Configuraciones from "../../../utils/Configuraciones.ts";

type FormularioFiltroProps = {
  filtro: Filtro,
  onSingleChange: ((field: string, value: string | File) => void),
}

const formFiltro = "form-filtro"

function FormularioFiltro(props: FormularioFiltroProps) {
  return (
    <form id={formFiltro} className="FormularioFiltro d-flex flex-column gap-2 text-start">
      <Campo id="nombre"
             value={props.filtro.nombre}
             type={TipoCampoTexto.Texto}
             placeholder="Nombre"
             etiqueta="Nombre del filtro"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"}
             maxLength={60}
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, máx 250)"
             onChange={props.onSingleChange}
      />
      <CampoDesplegable id="categoria"
                        value={props.filtro.categoria ? {
                          value: props.filtro.categoria,
                          label: props.filtro.categoria[0].toUpperCase() + props.filtro.categoria.substring(1)
                        } : null}
                        etiqueta="Categoría"
                        placeholder="Eliga la categoría"
                        required={true}
                        options={[
                          {value: "área", label: "Área"},
                          {value: "comunidad", label: "Comunidad"}
                        ]}
                        onChange={props.onSingleChange}
      />
      <div className="d-flex align-items-end gap-2">
        <CampoArchivo id="icono"
                      value={props.filtro.icono as File}
                      etiqueta="Ícono"
                      placeholder="*.svg"
                      required={props.filtro.id === null}
                      mensajeError="Agregue un ícono"
                      onChange={props.onSingleChange}
                      accept={".svg"}
        />
        {icono()}
      </div>
    </form>
  );

  function icono() {
    let url = ""
    if (typeof props.filtro.icono === "string" && props.filtro.icono !== "")
      url = Configuraciones.apiURL + props.filtro.icono
    else if (props.filtro.icono instanceof File) {
      url = URL.createObjectURL(props.filtro.icono)
    } else url = "/img-placeholder.svg"

    return <Image thumbnail src={url}/>
  }
}

FormularioFiltro.valida = () => {
  return (document.getElementById(formFiltro) as HTMLFormElement).reportValidity()
}

export default FormularioFiltro
