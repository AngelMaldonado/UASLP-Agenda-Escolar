import './_card-calendario.scss'
import {useContext, useState} from "react";
import Evento from "../../../models/Evento.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {modalEvento} from '../../Modales/ModalEliminarEditarEvento/ModalEliminarEditar.tsx';

type CardCalendarioProps = {
  evento: Evento
  admin?: boolean
}

function CardCalendario(props: CardCalendarioProps) {

  const setData = useContext(AgendaContext).setData
  const [evento] = useState(props.evento)

  return (
    <div className="card card-evento" onClick={() =>
      setData(prevState => ({...prevState, eventoActual: props.evento}))
     }>
      <div className="simbologia flex-grow-0">
        <div className="circle rounded-circle"
             style={{backgroundImage: `url(${Configuraciones.publicURL + evento.simbolo})`}}>
          5-6
        </div>
      </div>
      <div className="titulo-evento flex-grow-1">
        {props.evento.nombre}
      </div>
      {props.admin ? (
        <div className="d-flex flex-column gap-1 me-3" onClick={(e) => e.stopPropagation()}>
          {modalEvento(props)}
        </div>
      ) : null}
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </div>
    
  );
}

export default CardCalendario;
