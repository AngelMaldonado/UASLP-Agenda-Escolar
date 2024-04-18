import CardCalendario from "../Cards/CardCalendario";
import {Stack} from "react-bootstrap";
import {useContext} from "react";
import {AgendaContext} from "../../providers/AgendaProvider.tsx";

type CardsContenedorProps = { admin?: boolean }

export function CardsContenedor(props: CardsContenedorProps) {
  const mes = useContext(AgendaContext).data.mes
  const año = useContext(AgendaContext).data.año
  const eventos = useContext(AgendaContext).data.eventos?.filter(e =>
    e.fecha_inicio?.getMonth() == mes && e.fecha_inicio?.getFullYear() == año
  )

  return (
    <Stack gap={5}>
      {eventos?.map((evento) => (
        <CardCalendario key={"Card calendario" + evento.nombre} admin={props.admin} evento={evento}/>
      ))}
    </Stack>
  )
}
