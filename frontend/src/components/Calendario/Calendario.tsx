import {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Evento from "../../models/Evento.ts";
import esLocale from "@fullcalendar/core/locales/es"
import Configuraciones from "../../utils/Configuraciones.ts";

function Calendario(props: { eventos: Evento[] | undefined }) {
  const [events, setEvents] = useState(Evento.ParseEventosCalendario(props.eventos ?? []));

  useEffect(() => {
    setEvents(Evento.ParseEventosCalendario(props.eventos ?? []))
  }, [props.eventos]);

  return (
    <div className="calendar-container z-0">
      <FullCalendar plugins={[dayGridPlugin]}
                    locale={esLocale}
                    firstDay={1}
                    titleFormat={{year: "numeric", month: "short"}}
                    dayHeaderFormat={{weekday: "long"}}
                    events={events}
                    eventContent={evento}
                    eventClassNames={"evento-calendario my-1"}
                    eventBackgroundColor={"transparent"}
      />
    </div>
  );

  function evento(arg) {
    const evento = arg.event.extendedProps
    return (
      <div className="px-2 py-1 w-100 text-light rounded-4"
           style={{backgroundImage: `url(${Configuraciones.apiURL + evento.simbolo})`}}
      >
        <p className="px-2 m-0 bg-dark bg-opacity-75 rounded-4 titulo-evento-calendario"
           style={{
             width: evento.fecha_fin > evento.fecha_inicio ? "fit-content" : "100%"
           }}
        >
          {arg.event.extendedProps.nombre}
        </p>
      </div>
    )
  }
}


export default Calendario;
