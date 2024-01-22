import Evento from "../../../models/Evento.ts";
import CardAgenda from "../../Cards/CardAgenda";

export type AgendaProps = {
  eventos: Evento[] | undefined
}

export function Agenda(props: AgendaProps) {
  return (
    <div className="container my-4 d-flex flex-column gap-5">
      {props.eventos?.map((evento) => (
        <CardAgenda key={"Card agenda " + evento.nombre} evento={evento}/>
      ))}
    </div>
  );
}
