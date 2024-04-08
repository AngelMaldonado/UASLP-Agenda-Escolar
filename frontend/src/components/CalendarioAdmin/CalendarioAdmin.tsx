import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Evento from "../../models/Evento.ts";
//import "./styles.css";

function Calendario(props: { eventos: Evento[] | undefined }) {
  // Punto 1: Configurar un estado para gestionar los eventos
  const [events, setEvents] = useState(
    Evento.ParseEventosCalendario(props.eventos ?? [])
  );

  // Punto 3: Configurar el componente FullCalendar
  return (
    <div className="calendar-container z-0">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale="es-ES"
        firstDay={1}
        displayEventTime={false}
        eventContent={evento}
        eventClassNames={"evento-calendario my-1"}
        eventBackgroundColor={"transparent"}
      />
    </div>
  );

  function evento(arg) {
    const evento = arg.event.extendedProps;
    return (
      <div
        className="px-2 py-1 w-100 text-light rounded-4"
        style={{ backgroundImage: `url(${evento.simbolo})` }}
      >
        <p
          className="px-2 m-0 bg-dark bg-opacity-75 rounded-4 titulo-evento-calendario"
          style={{
            width:
              evento.fecha_fin > evento.fecha_inicio ? "fit-content" : "100%",
          }}
        >
          {arg.event.extendedProps.nombre}
        </p>
      </div>
    );
  }
}

export default Calendario;
