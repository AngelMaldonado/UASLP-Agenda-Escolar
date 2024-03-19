import CardCalendario from "../Cards/CardCalendario";
import {Stack} from "react-bootstrap";
import {useContext} from "react";
import {PublicContext} from "../../providers/AgendaProvider.tsx";

type CardsContenedorProps = { admin?: boolean }

export function CardsContenedor(props: CardsContenedorProps) {
  const eventos = useContext(PublicContext).data.eventos

  return (
    <Stack gap={5}>
      {eventos?.filter((evento) => evento.tipo !== 'alumnado').map((evento) => (
        <CardCalendario key={"Card calendario" + evento.nombre} admin={props.admin} evento={evento}/>
      ))}
    </Stack>
  )
}
