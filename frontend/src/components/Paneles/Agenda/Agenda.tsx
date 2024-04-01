import CardAgenda from "../../Cards/CardAgenda";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {meses} from "../../Calendario/Calendario.tsx";

export type AgendaProps = { admin?: boolean }

export function Agenda(props: AgendaProps) {
  const eventos = useContext(AgendaContext).data.eventos

  const cards = eventos?.map((evento, index) => (
    <>
      {index == 0 || evento.fecha_inicio!.getMonth() > eventos[index - 1].fecha_inicio!.getMonth() ?
        <h2>
          {[...meses.entries()].filter(([_, v]) => v == evento.fecha_inicio?.getMonth())[0][0]}
        </h2>
        : null}
      <CardAgenda key={"card-agenda-" + evento.nombre}
                  admin={props.admin}
                  evento={evento}
      />
    </>
  ))

  return (
    <div className="Agenda container d-flex flex-column gap-5">
      {cards?.flat()}
    </div>
  )
}
