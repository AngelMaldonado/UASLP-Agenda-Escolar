// TODO: evitar el clipping en el moreLink del calendario

import {useContext, useEffect, useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Evento from "../../models/Evento.ts";
import esLocale from "@fullcalendar/core/locales/es"
import {Configuraciones} from "../../utils/Constantes.ts";
import {CardsContenedor} from "./CardsContenedor.tsx";
import {AgendaContext} from "../../providers/AgendaProvider.tsx";
import {TipoEventoEnum} from "../../enums";

function Calendario() {
  const {data, setData} = useContext(AgendaContext)
  const calendarioRef = useRef<FullCalendar>(null)

  useEffect(() => {
  }, [data.textoBusqueda])

  return (
    <div className="calendar-container">
      <FullCalendar ref={calendarioRef}
                    plugins={[dayGridPlugin]}
                    locale={esLocale}
                    firstDay={1}
                    datesSet={(info) => {
                      const date = info.view.calendar.getDate()
                      setData(prevState =>
                        ({...prevState, mes: date.getMonth(), año: date.getFullYear()})
                      )
                    }}
                    dayMaxEvents={3}
                    dayPopoverFormat={{weekday: "long", day: "numeric"}}
                    titleFormat={{year: "numeric", month: "long"}}
                    headerToolbar={{start: "title", center: "", end: "prevYear,prev,today,next,nextYear"}}
                    dayHeaderFormat={{weekday: (window.innerWidth > 768 ? "long" : "short")}}
                    events={Evento.ParseEventosCalendario(data.eventos?.filter(e =>
                      e.tipo !== TipoEventoEnum.ALUMNADO) ?? [])
                    }
                    eventDidMount={(_) =>
                      setTimeout(() => calendarioRef?.current?.getApi().updateSize(), 1)
                    }
                    eventOverlap={false}
                    eventContent={cardEvento}
                    eventClassNames={"evento-calendario"}
                    eventBackgroundColor={"transparent"}
      />
      <CardsContenedor/>
    </div>
  );

  function cardEvento(arg: any) {
    const evento = arg.event.extendedProps

    return (
      <div className="px-1 py-1 w-100 text-center text-dark overflow-hidden"
           style={{
             backgroundImage: `url(${Configuraciones.publicURL + evento.simbolo})`,
             fontSize: "0.8rem"
           }}
           onClick={() => setData(prevState => ({...prevState, eventoActual: evento}))}
      >
        <div className="Filter position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-10"></div>
        <p
          className={
            `px-1 m-0 rounded-4 titulo-evento-calendario ${arg.isStart ? "bg-light bg-opacity-75" : "opacity-0"}`
          }
          style={{
            width: evento.fecha_fin > evento.fecha_inicio ? "fit-content" : "100%",
            maxWidth: "100%"
          }}
        >
          {arg.event.extendedProps.nombre}
        </p>
      </div>
    )
  }
}


export default Calendario;
