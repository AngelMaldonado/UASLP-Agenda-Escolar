import Evento from "../../../models/Evento.ts";
import CardAgenda from "../../Cards/CardAgenda";
import Modal from "../../Modales/Modal";
import {FaRegCalendar, FaRegCalendarAlt} from "react-icons/fa";
import {useState} from "react";
import {Image, Stack} from "react-bootstrap";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import Filtro from "../../../models/Filtro.ts";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";

export type AgendaProps = {
  eventos?: Evento[]
  filtros?: Filtro[]
}

export function Agenda(props: AgendaProps) {
  const [eventoActual, setEventoActual] = useState(new Evento())

  const cards = props.eventos?.map((evento) => (
    <CardAgenda key={"card-agenda-" + evento.nombre}
                evento={evento}
                onClick={() => setEventoActual(evento)}
                filtros={props.filtros}
    />
  ))

  return (
    <div className="Agenda container my-4 d-flex flex-column gap-5">
      {cards?.flat()}
      {modalEvento()}
    </div>
  )

  function modalEvento() {
    if (eventoActual.id)
      return (
        <Modal
          mostrar
          onClose={onClose}
          titulo={<FaRegCalendarAlt/>}
          contenido={contenidoModal()}
        />
      )
  }

  function contenidoModal() {
    return (
      <Stack className="modalEvento" gap={3}>
        <Stack direction="horizontal" gap={2}>
          <Image className="img-fluid rounded-2" width={60} src={Configuraciones.publicURL + eventoActual.simbolo}/>
          <h5>{eventoActual.nombre}</h5>
        </Stack>
        <Stack direction="horizontal">
          <h5 className="flex-fill lh-base m-0 fw-light">
            Inicia:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(eventoActual?.fecha_inicio)}
            </span>
          </h5>
          <h5 className="flex-fill lh-base m-0 fw-light">
            Termina:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(eventoActual?.fecha_fin)}
            </span>
          </h5>
        </Stack>
        <ChipsEvento noFloat filtros={props.filtros} filtros_evento={eventoActual.filtros}/>
        {eventoActual.imagen ? <Image src={Configuraciones.publicURL + eventoActual.imagen}/> : null}
        <p>{eventoActual.descripcion}</p>
        {eventoActual.hipervinculos?.length! > 0 ?
          <Stack>
            {eventoActual.hipervinculos?.map(hipervinculo =>
              <Boton href={hipervinculo} etiqueta={hipervinculo} variant={TemaComponente.PrimarioInverso}/>
            )}
          </Stack>
          : null}
      </Stack>
    )
  }

  function onClose() {
    setEventoActual(new Evento())
  }
}
