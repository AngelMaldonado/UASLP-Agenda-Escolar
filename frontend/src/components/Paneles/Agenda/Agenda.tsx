import CardAgenda from "../../Cards/CardAgenda";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {meses} from "../../Calendario/Calendario.tsx";
import {Stack} from "react-bootstrap";

export type AgendaProps = { admin?: boolean }

export function Agenda(props: AgendaProps) {
  const eventos = useContext(AgendaContext).data.eventos
  const año = useContext(AgendaContext).data.año

  const cards = eventos?.map((evento, index) => (
    index == 0 || evento.fecha_inicio!.getMonth() > eventos[index - 1].fecha_inicio!.getMonth() ?
      <div key={`card-agenda-container-${evento.nombre}`}>
        <Stack direction="horizontal" className="w-100 mb-4">
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
          <h2 key={`titulo-mes-${index}`} className="TituloMes text-nowrap">
            {`${[...meses.entries()][evento.fecha_inicio!.getMonth()][0]} ${año}`}
          </h2>
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
        </Stack>
        <CardAgenda key={"card-agenda-" + evento.nombre} admin={props.admin} evento={evento}/>
      </div>
      : <CardAgenda key={"card-agenda-" + evento.nombre} admin={props.admin} evento={evento}/>
  ))

  return (
    <div className="Agenda container d-flex flex-column gap-5">
      {cards?.flat()}
    </div>
  )
}
