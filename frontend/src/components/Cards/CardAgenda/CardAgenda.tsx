import './_card_agenda.scss'
import Evento from '../../../models/Evento.ts';
import Card from "react-bootstrap/Card";
import {Button, Stack} from "react-bootstrap";
import {Configuraciones} from "../../../utils/Constantes.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ModalCRUDEvento from "../../Modales/ModalCRUDEvento"
import {FaRegCalendar} from "react-icons/fa";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

type CardAgendaProps = {
  evento: Evento,
}

function CardAgenda(props: CardAgendaProps) {
  const {setData} = useContext(AgendaContext)

  return (
    <Card className="CardAgenda"
          onClick={() => setData(prevState => ({...prevState, eventoActual: props.evento}))}
    >
      <Card.Body>
        <Card.Title className="d-flex gap-2 align-items-center">
          <Card.Img src={Configuraciones.publicURL + props.evento.simbolo}
                    alt={"Símbolo " + props.evento.nombre}/>
          <h6 className="text-wrap">{props.evento.nombre}</h6>
        </Card.Title>
        {fechas()}
        <Card.Text className="fs-6 fw-lighter">
          {props.evento.descripcion}
        </Card.Text>
        {props.evento.imagen ?
          <img src={Configuraciones.publicURL + props.evento.imagen}
               alt={"Imagen " + props.evento.nombre}/>
          : null}
        {hipervinculos()}
        <div className="d-flex flex-column justify-content-center align-items-center gap-1 me-3 "
             onClick={(e) => e.stopPropagation()}>
          {ModalCRUDEvento(props)}
        </div>
      </Card.Body>
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </Card>
  );

  function fechas() {
    const mismoDia = props.evento.fecha_inicio?.getDate() == props.evento.fecha_fin?.getDate()

    return (
      <Stack direction="horizontal" gap={3}>
        <h6 className="lh-base m-0">
          {!mismoDia ? "Inicia:" : ""}<br hidden={mismoDia}/>
          <span className="d-flex align-items-center gap-1">
            <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(props.evento.fecha_inicio)}
          </span>
        </h6>
        <h6 hidden={mismoDia} className="lh-base m-0">
          Termina:<br/>
          <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(props.evento.fecha_fin)}
            </span>
        </h6>
      </Stack>
    )
  }

  function hipervinculos() {
    if (props.evento.hipervinculos)
      return (
        <Stack className="Hipervinculos h-100">
          {props.evento.hipervinculos.map((hipervinculo, index) => (
            <OverlayTrigger key={`hipervinculo-${index}`} overlay={<Tooltip>{hipervinculo}</Tooltip>}>
              <Button variant="primary-inverse"
                      className="nav-link p-0 px-2 d-inline-block text-truncate"
                      href={hipervinculo}
                      target="_blank"
                      onClick={e => e.stopPropagation()}
              >
                {hipervinculo?.replace(/(^\w+:|^)\/\//, '')}
              </Button>
            </OverlayTrigger>
          ))}
        </Stack>
      )
    else return null
  }
}

export default CardAgenda;
