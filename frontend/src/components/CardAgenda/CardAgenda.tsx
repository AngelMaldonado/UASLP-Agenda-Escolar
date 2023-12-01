import './_card-agenda.scss'
import Evento from '../../models/Evento';
import {FaRegCalendar} from "react-icons/fa";

const TarjetaLarga = (props: { evento: Evento }) => {
  return (
    <div className="cardLarge">
      <div className="content">
        <img src={props.evento?.simbolo} alt={"Simbolo " + props.evento?.nombre}/>
        <div className='bold me-3'>
          {props.evento?.nombre}
        </div>
        <div className='fechas'>
          Inicia:
          <div className="d-flex gap-2 align-items-center fecha">
            {/* <FaRegCalendar/> {Intl.DateTimeFormat('es-MX').format(props.evento?.fecha_inicio).toUpperCase()} */}
          </div>
          Termina:
          <div className="d-flex gap-2 align-items-center fecha">
            {/* <FaRegCalendar/> {Intl.DateTimeFormat('es-MX').format(props.evento?.fecha_fin).toUpperCase()} */}
          </div>
        </div>
        <div className='text'>
          {props.evento?.descripcion}
        </div>
      </div>
      <div className="pills">
        <span className="fs-6">Estudiantes</span>
        <span className="fs-6">Ingenieria</span>
      </div>
    </div>
  );
}

export default TarjetaLarga;
