import './_card-calendario-contenedor.scss'
import {useContext, useState} from "react";
import Evento from "../../../models/Evento.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {modalEvento} from '../../Modales/ModalEliminarEditarEvento/ModalEliminarEditar.tsx';
import ChipSimbolo from "../../Chips/ChipSimbolo/ChipSimbolo.tsx";
import {useLocation} from "react-router-dom";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";

type CardCalendarioProps = {
  evento: Evento
}

function CardCalendarioContenedor(props: CardCalendarioProps) {
  const location = useLocation()
  const {setData} = useContext(AgendaContext)
  const usuario = useObtenSesion().sesion?.usuario
  const [evento] = useState(props.evento)

  return (
    <div className="card card-evento" onClick={() =>
      setData(prevState => ({...prevState, eventoActual: props.evento}))
    }>
      <div className="simbologia flex-grow-0">
        <ChipSimbolo simbolo={evento.simbolo!} fecha_inicio={evento.fecha_inicio!} fecha_fin={evento.fecha_fin!}/>
      </div>
      <div className="titulo-evento flex-grow-1">
        {props.evento.nombre}
      </div>
      {location.pathname == "/administracion" && usuario ? (
        <div className="d-flex flex-column gap-1 me-3" onClick={(e) => e.stopPropagation()}>
          {modalEvento(props)}
        </div>
      ) : null}
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </div>

  );
}

export default CardCalendarioContenedor;
