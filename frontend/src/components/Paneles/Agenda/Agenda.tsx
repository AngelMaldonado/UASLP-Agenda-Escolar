import CardAgenda from "../../Cards/CardAgenda";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {Stack} from "react-bootstrap";
import {meses} from "../../../utils/Constantes.ts";
import {TipoEventoEnum} from "../../../enums";

export function Agenda() {
  const eventos = useContext(AgendaContext).data.eventos?.filter(evento =>
    evento.tipo !== TipoEventoEnum.ALUMNADO
  )

  const cards = eventos?.map((evento, index) => (
    index == 0 || evento.fecha_inicio!.getMonth() > eventos[index - 1].fecha_inicio!.getMonth() ?
      <div key={`card-agenda-container-${evento.nombre}`}>
        <Stack direction="horizontal" className="w-100 mb-4">
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
          <h2 key={`titulo-mes-${index}`} className="TituloMes text-nowrap mx-4">
            {`${[...meses.entries()][evento.fecha_inicio!.getMonth()][0]}`}
          </h2>
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
        </Stack>
        <CardAgenda key={"card-agenda-" + evento.nombre} evento={evento}/>
      </div>
      : <CardAgenda key={"card-agenda-" + evento.nombre} evento={evento}/>
  ))

  return (
    <div className="Agenda container d-flex flex-column gap-5">
      {cards?.flat()}
    </div>
  )
}
