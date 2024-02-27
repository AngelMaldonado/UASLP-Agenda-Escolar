import {TipoEventoEnum} from "../../enums";
import CardCalendario from "../Cards/CardCalendario";
import Evento from "../../models/Evento.ts";
import {Stack} from "react-bootstrap";

type CardsContenedorProps = {
  eventos?: Evento[],
  admin?: boolean
}

export function CardsContenedor(props: CardsContenedorProps) {
  return (
    <Stack gap={5}>
      {props.eventos?.filter(e => e.tipo != TipoEventoEnum.ALUMNADO).map((evento) => (
        <CardCalendario key={"Card calendario" + evento.nombre} admin={props.admin} evento={evento}/>
      ))}
    </Stack>
  )
}
