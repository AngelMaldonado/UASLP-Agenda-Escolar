import "./CardCalendarioNotificacion.scss";
import Evento from "../../../models/Evento.ts";

type CardCalendarioNotificacionProps = {
  evento: Evento;
};

function CardCalendarioNotificacion() {
  return (
    <div className="card nuevo-evento">
      <img
        src="../../../assets/notificacion.png"
        alt="Nuevo evento"
        className="destello"
      />
      <div className="flex-grow-0">
        <div className="circle bg-info-subtle rounded-circle">
          <img src="" alt={"Simbologia "}/>
          <small>16/11/2023</small>
          5-6
        </div>
      </div>
      <div className="w-100 me-2 titulo-evento">nombre</div>
      <div className="pills">
        <span>Estudiantes</span>
        <span>Ingenieria</span>
      </div>
    </div>
  );
}

export default CardCalendarioNotificacion;
