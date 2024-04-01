import {useContext, useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Evento from "../../models/Evento.ts";
import esLocale from "@fullcalendar/core/locales/es"
import Configuraciones from "../../utils/Configuraciones.ts";
import {CardsContenedor} from "./CardsContenedor.tsx";
import {AgendaContext} from "../../providers/AgendaProvider.tsx";


export type CalendarioProps = {
  admin?: boolean
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
  const {data, setData} = useContext(AgendaContext)
  const [events, setEvents] = useState(Evento.ParseEventosCalendario(data.eventos ?? []));

  useEffect(() => {
    setEvents(Evento.ParseEventosCalendario(data.eventos ?? []).filter(evento => evento.tipo !== 'alumnado'))
  }, [data.eventos]);

  return (
    <div className="calendar-container">
      <FullCalendar plugins={[dayGridPlugin]}
                    locale={esLocale}
                    firstDay={1}
                    datesSet={(info) => {
                      const titulo = info.view.title.split(' ')
                      setData(prevState =>
                        ({...prevState, mes: meses.get(titulo[0].toLowerCase())!})
                      )
                    }}
                    dayMaxEventRows
                    titleFormat={{year: "numeric", month: "long"}}
                    dayHeaderFormat={{weekday: "long"}}
                    events={events}
                    eventContent={cardEvento}
                    eventClassNames={"evento-calendario"}
                    eventBackgroundColor={"transparent"}
      />
      <CardsContenedor admin={props.admin}/>
    </div>
  );

  function cardEvento(arg: any) {
    const evento = arg.event.extendedProps
    return (
      <div className="px-1 py-1 w-100 text-center text-dark"
           style={{
             backgroundImage: `url(${Configuraciones.publicURL + evento.simbolo})`,
             fontSize: "0.8rem"
           }}
      >
        <p
          className={
            `px-1 m-0 rounded-4 titulo-evento-calendario ${arg.isStart ? "bg-light bg-opacity-75" : "opacity-0"}`
          }
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
