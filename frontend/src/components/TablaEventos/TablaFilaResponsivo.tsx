import ModalCRUDEvento from "../Modales/ModalCRUDEvento"
import TooltipFiltro from "./TooltipFiltros.tsx";
import {useState, useContext} from "react";
import Evento from "../../models/Evento";
import {AgendaContext} from "../../providers/AgendaProvider.tsx";
import {FiltrosCategoriaEnum} from "../../enums/FiltrosEnum.ts";
import {Configuraciones} from "../../utils/Constantes.ts";

export type TablaFilaResponsivoProps = {
  evento: Evento,
  admin?: boolean,
  filtros_evento?: number[]
}


function TablaFilaResponsivo(props: TablaFilaResponsivoProps) {
  const [events] = useState(props.evento)
  const filtros = useContext(AgendaContext).data.filtros

  const areas = filtros?.filter(f =>
    props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.AREA
  )

  const comunidades = filtros?.filter(f =>
    props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.COMUNIDAD
  )


  return (
    <ul className="table">
      <li className="row">
        <div className="column1"><p>Evento: </p></div>
        <div className="column2"><p>{events.nombre}</p></div>
      </li>
      <li className="row">
        <div className="column1"><p>Simbologia: </p></div>
        <div className="column2">
          <div className='image-container'>
            <span className='w-75'>
             <img src={Configuraciones.publicURL + props.evento?.simbolo} className='img-fluid'/>
            </span>
          </div>
        </div>
      </li>
      <li className="row">
        <div className="column1"><p>Inicio: </p></div>
        <div className="column2"><p>{Intl.DateTimeFormat('es-MX').format(events?.fecha_inicio).toUpperCase()}</p></div>
      </li>
      <li className="row">
        <div className="column1"><p>Fin: </p></div>
        <div className="column2"><p>{Intl.DateTimeFormat('es-MX').format(events?.fecha_fin).toUpperCase()}</p></div>
      </li>
      <li className="row">
        <div className="column1"><p>Comunidad: </p></div>
        <div className="column2">{TooltipFiltro(comunidades)}</div>
      </li>
      <li className="row">
        <div className="column1">
          <p>Area: </p></div>

        <div className="column2">{TooltipFiltro(areas)}</div>
      </li>
      <li className="row">
        <div className="column1"><p>Descripcion: </p></div>
        <div className="column2"><p>{events.descripcion}</p></div>
      </li>
      <li className="row">
        <div className="column1"><p>Imagen: </p></div>
        <div className="column2">
          <div className='image-container'>
            <span className='w-75'>
              <img src='https://picsum.photos/200/300'/*src={events.imagen}*/ alt="" className='img-fluid '/>
            </span>
          </div>
        </div>
      </li>
      <li className="row">
        <div className="column1"><p>Hipervinculo: </p></div>
        <div className="column2"><p>{events.hipervinculos}</p></div>
      </li>
      <li className="row">
        <div className='d-flex justify-content-end'>{ModalCRUDEvento(props)}</div>
      </li>
    </ul>
  )

}

export default TablaFilaResponsivo;
