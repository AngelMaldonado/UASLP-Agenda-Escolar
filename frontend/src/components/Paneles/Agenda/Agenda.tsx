import CardAgenda from "../../Cards/CardAgenda";
import {useContext} from "react";
import {PublicContext} from "../../../providers/AgendaProvider.tsx";

export type AgendaProps = { admin?: boolean }

export function Agenda(props: AgendaProps) {
  const eventos = useContext(PublicContext).data.eventos

  const cards = eventos?.map((evento) => (
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
