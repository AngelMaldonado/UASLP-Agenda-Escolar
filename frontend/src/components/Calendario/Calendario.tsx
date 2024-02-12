import {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Evento from "../../models/Evento.ts";
import esLocale from "@fullcalendar/core/locales/es"
import Configuraciones from "../../utils/Configuraciones.ts";


export type CalendarioProps = {
  eventos: Evento[] | undefined,
  setMes: (mes: number) => void
}
 
const meses: Map<string, number> = new Map([
  ['ene', 0],
  ['feb', 1],
  ['mar', 2],
  ['abr', 3],
  ['may', 4],
  ['jun', 5],
  ['jul', 6],
  ['ago', 7],
  ['sept', 8],
  ['oct', 9],
  ['nov', 10],
  ['dic', 11],
])

function Calendario(props: CalendarioProps) {
  const [events, setEvents] = useState(Evento.ParseEventosCalendario(props.eventos ?? []));

  useEffect(() => {
    setEvents(Evento.ParseEventosCalendario(props.eventos ?? []))
  }, [props.eventos]);

  return (
    <div className="calendar-container z-0">
      <FullCalendar plugins={[dayGridPlugin]}
                    locale={esLocale}
                    firstDay={1}
                    datesSet={(info) => {
                      const titulo = info.view.title.split(' ')
                      props.setMes(meses.get(titulo[0].toLowerCase())!)
                    }}
                    titleFormat={{year: "numeric", month: "short"}}
                    dayHeaderFormat={{weekday: "long"}}
                    events={events}
                    eventContent={cardEvento}
                    eventClassNames={"evento-calendario my-1"}
                    eventBackgroundColor={"transparent"}
      />
    </div>
  );

  function cardEvento(arg) {
    const evento = arg.event.extendedProps
    return (
      <div className="px-2 py-1 w-100 text-center text-dark rounded-4 "
           style={{backgroundImage: `url(${Configuraciones.apiURL + evento.simbolo})`}}
      >
        <p className="px-2 m-0 bg-light bg-opacity-75 rounded-4 titulo-evento-calendario w-100"
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
