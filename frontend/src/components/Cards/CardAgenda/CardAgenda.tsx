import './_card_agenda.scss'
import Evento from '../../../models/Evento.ts';
import {FaRegCalendar, FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import Card from "react-bootstrap/Card";
import {Button, ButtonGroup, Stack} from "react-bootstrap";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

type CardAgendaProps = {
  evento: Evento,
  admin?: boolean
}

function CardAgenda(props: CardAgendaProps) {
  const setData = useContext(AgendaContext).setData

  return (
    <Card className="CardAgenda flex-row" onClick={() =>
      setData(prevState => ({...prevState, eventoActual: props.evento}))
    }>
      <Card.Body>
        <Card.Title className="fs-6">
          <Card.Img src={Configuraciones.publicURL + props.evento?.simbolo} alt={"Símbolo " + props.evento?.nombre}/>
          {props.evento?.nombre}
        </Card.Title>
        <Stack>
          <h6 className="lh-base m-0">
            Inicia:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(props.evento?.fecha_inicio)}
            </span>
          </h6>
          <h6 className="lh-base m-0">
            Termina:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(props.evento?.fecha_fin)}
            </span>
          </h6>
        </Stack>
        <Card.Text className="fs-6 fw-lighter w-100">{props.evento?.descripcion}</Card.Text>
        {props.evento.imagen ?
          <img src={Configuraciones.publicURL + props.evento.imagen} alt={"Imagen " + props.evento?.nombre}/>
          : null}
        {hipervinculos()}
        {props.admin ? (
          <>
            <div className="Modificacion h-100 w-100 fs-6">
              <p className="m-0">Última modificación</p>
              <img className="w-25 h-auto rounded-circle" src="https://ui-avatars.com/api/?name=John+Doe"
                   alt="Foto usuario..."/>
              <p className="m-0">John Doe</p>
              <p className="m-0">14 ene 2023, 14:00</p>
            </div>
            <ButtonGroup>
              <Boton variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>
              <Boton variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>
            </ButtonGroup>
          </>
        ) : null}
      </Card.Body>
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </Card>
  );

  function hipervinculos() {
    if (props.evento.hipervinculos)
      return (
        <div className="Hipervinculos h-100 z-1">
          {props.evento.hipervinculos.map((hipervinculo, index) => (
            <OverlayTrigger key={`hipervinculo-${index}`} overlay={<Tooltip>{hipervinculo}</Tooltip>}>
              <Button variant="primary-inverse"
                      className="nav-link p-0 d-inline-block text-truncate"
                      href={hipervinculo}
                      target="_blank"
                      onClick={e => e.stopPropagation()}
              >
                {hipervinculo?.replace(/(^\w+:|^)\/\//, '')}
              </Button>
            </OverlayTrigger>
          ))}
        </div>
      )
    else return null
  }
}

export default CardAgenda;
