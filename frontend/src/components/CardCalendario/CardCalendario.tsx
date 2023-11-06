import './_card-calendario.scss'
import Evento from "../../models/Evento.ts";

type CardCalendarioProps = {
  evento: Evento
}

function CardCalendario(props: CardCalendarioProps) {
  return (
    <div className="card card-evento">
      <div className="flex-grow-0">
        <div className="circle bg-info-subtle rounded-circle">
          <img src={props.evento.simbolo} alt={"Simbologia " + props.evento.nombre}/>
          <small>
            {Intl.DateTimeFormat('es-MX', {month: 'short'}).format(props.evento.fecha_inicio.getMonth()).toUpperCase()}
          </small>
          5-6
        </div>
      </div>
      <div className="w-100 me-2 titulo-evento">
        {props.evento.nombre}
      </div>
      <div className="pills">
        <span>Estudiantes</span>
        <span>Ingenieria</span>
      </div>
    </div>
  );
}

export default CardCalendario;
