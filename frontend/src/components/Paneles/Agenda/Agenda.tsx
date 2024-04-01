import CardAgenda from "../../Cards/CardAgenda";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

export type AgendaProps = { admin?: boolean }

export function Agenda(props: AgendaProps) {
  const eventos = useContext(AgendaContext).data.eventos

  const cards = eventos?.filter((evento) => evento.tipo !== 'alumnado').map((evento) => (
    <CardAgenda key={"card-agenda-" + evento.nombre}
                admin={props.admin}
                evento={evento}
    />
  ))

  return (
    <div className="Agenda container my-4 d-flex flex-column gap-5">
      {cards?.flat()}
    </div>
  )
}
