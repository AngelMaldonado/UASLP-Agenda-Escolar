import { modalEvento } from "../Modales/ModalEliminarEditarEvento/ModalEliminarEditar";
import { useState, useContext} from "react";
import Evento from "../../models/Evento";
import { AgendaContext } from "../../providers/AgendaProvider.tsx";
import { FiltrosCategoriaEnum } from "../../enums/FiltroCategoriaEnum.ts";
import TooltipFiltro from "./TooltipFiltros.tsx";
import Configuraciones from "../../utils/Configuraciones.ts";

export type TablaFilasProps = {
    evento: Evento,
    admin?: boolean,
    filtros_evento?: number[]
  }

function TablaFilas(props: TablaFilasProps) {

    const [evento] = useState(props.evento);
    const filtros = useContext(AgendaContext).data.filtros

    const areas = filtros?.filter(f =>
      props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.AREA
    )
  
    const comunidades = filtros?.filter(f =>
      props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.COMUNIDAD
    )

    return (
      <tr className=''>
        {/* <td>{evento.cat_evento_id}</td> */}
        <td>{evento.nombre}</td>
        <td>
          <div className='image-container'>
            <span className='w-75'>
              <img src={Configuraciones.publicURL + props.evento?.simbolo} className='img-fluid'/>
            </span>
          </div>
        </td>
        <td>{Intl.DateTimeFormat('es-MX').format(evento?.fecha_inicio).toUpperCase()}</td>
        <td>{Intl.DateTimeFormat('es-MX').format(evento?.fecha_fin).toUpperCase()}</td>
        <td>
          <div className='d-flex justify-content-center'>
            {TooltipFiltro(comunidades)}
          </div>
        </td>
        <td>
          <div className='d-flex justify content-center'>
            {TooltipFiltro(areas)}
          </div>
        </td>
        <td>{evento.descripcion}</td>
        <td>
          <div className='image-container'>
            <span className='w-75'>
              <img src='https://picsum.photos/200/300'/*src={events.imagen}*/ alt="" className='img-fluid '/>
            </span>
          </div>
        </td>
        <td>
  <div className="hipervinculos" style={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }}>
    {evento.hipervinculos}
  </div>
</td>

        <td>
          <div className='d-flex-column'>
            {modalEvento(props)}
          </div>
        </td>
      </tr>
    );

  }

  export default TablaFilas;