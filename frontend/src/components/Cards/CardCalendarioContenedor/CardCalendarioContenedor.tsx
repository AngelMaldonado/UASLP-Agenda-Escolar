import './_card-calendario-contenedor.scss'
import Evento from "../../../models/Evento.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import {AgendaContextDataEnum} from "../../../providers/AgendaProvider.tsx";
import ModalCRUDEvento from "../../Modales/ModalCRUDEvento"
import ChipSimbolo from "../../Chips/ChipSimbolo/ChipSimbolo.tsx";
import {useLocation} from "react-router-dom";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {useCambiaContexto} from "../../../hooks/HookObjectChange.ts";

type CardCalendarioProps = {
  evento: Evento
}

function CardCalendarioContenedor(props: CardCalendarioProps) {
  const location = useLocation()
  const {cambiaContexto} = useCambiaContexto()
  const usuario = useObtenSesion().sesion?.usuario
  const {evento} = props

  return (
    <div className="card card-evento" onClick={() => cambiaContexto(AgendaContextDataEnum.EventoActual, props.evento)}>
      <div className="simbologia flex-grow-0">
        <ChipSimbolo simbolo={evento.simbolo!} fecha_inicio={evento.fecha_inicio!} fecha_fin={evento.fecha_fin!}/>
      </div>
      <div className="titulo-evento flex-grow-1">
        {props.evento.nombre}
      </div>
      {location.pathname == "/administracion" && usuario ? (
        <div className="d-flex flex-column gap-1 me-3" onClick={(e) => e.stopPropagation()}>
          {ModalCRUDEvento(props)}
        </div>
      ) : null}
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </div>

  );
}

export default CardCalendarioContenedor;
