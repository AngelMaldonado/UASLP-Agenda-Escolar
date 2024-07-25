import CardAgenda from "../../Cards/CardAgenda";
import {useContext, useEffect} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {Stack} from "react-bootstrap";
import {meses} from "../../../utils/Constantes.ts";
import {TipoEventoEnum} from "../../../enums";

export function Agenda() {
  const añosBusqueda = useContext(AgendaContext).data.añosBusqueda
  const mesesBusqueda = useContext(AgendaContext).data.mesesBusqueda

  const eventos = useContext(AgendaContext).data.eventos?.filter(evento => {
    let incluir = true

    incluir = evento.tipo !== TipoEventoEnum.ALUMNADO

    if (añosBusqueda && añosBusqueda.length > 0 && !añosBusqueda.includes(evento.fecha_inicio!.getFullYear()) && !añosBusqueda.includes(evento.fecha_fin!.getFullYear()))
      incluir = false

    if (mesesBusqueda && mesesBusqueda.length > 0 && !mesesBusqueda.includes(evento.fecha_inicio!.getMonth()) && !mesesBusqueda.includes(evento.fecha_fin!.getMonth()))
      incluir = false

    return incluir
  })

  const mes = new Date().getMonth()
  const año = new Date().getFullYear()

  const cards = eventos?.map((evento, index) => (
    index == 0 ||
    evento.fecha_inicio!.getMonth() > eventos[index - 1].fecha_inicio!.getMonth() ||
    evento.fecha_inicio!.getFullYear() > eventos[index - 1].fecha_inicio!.getFullYear() ?
      <div key={`card-agenda-container-${evento.nombre}-${evento.id}`}
           id={evento.fecha_inicio?.getMonth() == mes && evento.fecha_inicio?.getFullYear() == año ? "scrollTo" : undefined}
      >
        <Stack direction="horizontal" className="w-100 mb-4">
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
          <h2 key={`titulo-mes-${index}`} className="TituloMes text-nowrap mx-4">
            {`${[...meses.entries()][evento.fecha_inicio!.getMonth()][0]} ${evento.fecha_inicio!.getFullYear()}`}
          </h2>
          <hr className="border border-primary border-2 opacity-100 w-100 rounded-5"/>
        </Stack>
        <CardAgenda key={"card-agenda-" + evento.nombre} evento={evento}/>
      </div>
      : <CardAgenda key={`card-agenda-${evento.nombre}-${evento.id}`} evento={evento}/>
  ))

  useEffect(() => {}, [añosBusqueda, mesesBusqueda]);

  return (
    <div className="Agenda container d-flex flex-column gap-5">
      {cards?.flat()}
    </div>
  )
}
