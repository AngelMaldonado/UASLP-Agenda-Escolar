import "./_formularioEvento.scss"
import Campo from "../Campo"
import {TipoCampo} from "../Campo/Campo.tsx"
import Comunidades from "../../models/Comunidades.ts";
import Areas from "../../models/Areas.ts";
import Evento from "../../models/Evento.ts"
import CatEventos from "../../models/CatEvento.ts";

type FormularioEventoProps = {
  evento: Evento,
  onSingleChange: ((field: string, value: string) => void),
  onMultipleChange: ((value: string) => void),
}

const formNuevoEventoId = "form-nuevo-evento"

function NuevoEvento(props: FormularioEventoProps) {
  return (
    <form id={formNuevoEventoId} className="d-flex flex-column gap-2 text-start">
      <Campo id="nombre"
             value={props.evento.nombre}
             type={TipoCampo.Desplegable}
             options={CatEventos}
             placeholder="Nombre"
             etiqueta="Nombre"
             required={true}
             pattern={"^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"} // <- Agregar también dígitos
             mensajeError="Ingrese nombre(s) válido (A-Z, a-z, 0-9 máx 100)"
             onChange={props.onSingleChange}
      />
      <div className="d-flex gap-2">
        <Campo id="simbologia"
          /*value={props.evento.simbolo}*/
               type={TipoCampo.Texto}
               placeholder="Simbología"
               etiqueta="Simbología"
               required={true}
               onChange={props.onSingleChange}
        />
        <Campo id="imagen"
               value={props.evento.imagen}
               type={TipoCampo.Texto}
               etiqueta="Imagen"
               placeholder="*.jpg, *.png, *.svg"
               onChange={props.onSingleChange}
        />
      </div>
      <Campo id="comunidad"
             type={TipoCampo.Desplegable}
             etiqueta="Comunidad"
             placeholder="Comunidad"
             options={Comunidades}
      />
      <Campo id="area"
             type={TipoCampo.Desplegable}
             etiqueta="Área"
             placeholder="Área"
             options={Areas}
      />
      <div className="d-flex gap-2">
        <Campo id="fecha-inicio"
               value={props.evento.fecha_inicio.toDateString()}
               type={TipoCampo.Fecha}
               etiqueta="Fecha Inicio"
               placeholder="Fecha Inicio"
               onChange={props.onSingleChange}
        />
        <Campo id="fecha-fin"
               value={props.evento.fecha_fin.toDateString()}
               type={TipoCampo.Texto}
               etiqueta="Fecha Fin"
               placeholder="Fecha Fin"
               onChange={props.onSingleChange}
        />
      </div>
      <Campo id="hipervinculos"
             value={props.evento.hipervinculos}
             type={TipoCampo.Desplegable}
             etiqueta="Hipervínculos"
             placeholder="Hipervínculos"
             onChange={props.onMultipleChange}
      />
      <Campo id="descripcion"
             value={props.evento.descripcion}
             type={TipoCampo.Texto}
             etiqueta="Descripción"
             placeholder="Descripción"
             onChange={props.onSingleChange}
      />
    </form>
  );
}

NuevoEvento.valida = () => {
  return (document.getElementById(formNuevoEventoId) as HTMLFormElement).reportValidity()
}

export default NuevoEvento
