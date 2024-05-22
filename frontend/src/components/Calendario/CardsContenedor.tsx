import CardCalendarioContenedor from "../Cards/CardCalendarioContenedor";
import {Stack} from "react-bootstrap";
import {useContext} from "react";
import {AgendaContext} from "../../providers/AgendaProvider.tsx";
import {TipoEventoEnum} from "../../enums";

export function CardsContenedor() {
  const {mes, año} = useContext(AgendaContext).data
  const eventos = useContext(AgendaContext).data.eventos?.filter(e =>
    e.fecha_inicio?.getMonth() == mes && e.fecha_fin?.getFullYear() == año && e.tipo != TipoEventoEnum.ALUMNADO
  )

  return (
    <Stack gap={5} className="z-0">
      {eventos?.map((evento) => (
        <CardCalendarioContenedor key={"Card calendario" + evento.nombre} evento={evento}/>
      ))}
    </Stack>
  )
}
