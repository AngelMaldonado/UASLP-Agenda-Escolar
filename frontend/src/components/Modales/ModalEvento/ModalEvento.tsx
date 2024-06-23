import Modal from "../Modal";
import {FaRegCalendar} from "react-icons/fa";
import {Button, Image, Stack} from "react-bootstrap";
import {Configuraciones} from "../../../utils/Constantes.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {CgCalendarToday} from "react-icons/cg";

export default function ModalEvento() {
  const {data, setData} = useContext(AgendaContext)
  const evento = data.eventoActual

  if (evento)
    return (
      <Modal
        mostrar
        onClose={onClose}
        titulo={<CgCalendarToday/>}
        contenido={contenidoModal()}
      />
    )
  else return null

  function contenidoModal() {
    return (
      <Stack className="ModalEvento" gap={3}>
        <Stack direction="horizontal" gap={2}>
          <Image className="img-fluid rounded-2" width={60} src={Configuraciones.publicURL + evento?.simbolo}/>
          <h5>{evento?.nombre}</h5>
        </Stack>
        <Stack direction="horizontal">
          <h5 className="flex-fill lh-base m-0 fw-light">
            Inicia:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(evento?.fecha_inicio)}
            </span>
          </h5>
          <h5 className="flex-fill lh-base m-0 fw-light">
            Termina:<br/>
            <span className="d-flex align-items-center gap-1">
              <FaRegCalendar/> {Intl.DateTimeFormat("es-MX").format(evento?.fecha_fin)}
            </span>
          </h5>
        </Stack>
        <ChipsEvento noFloat filtros_evento={evento?.filtros}/>
        {evento?.imagen ? <Image src={Configuraciones.publicURL + evento?.imagen}/> : null}
        <p>{evento?.descripcion}</p>
        {evento?.hipervinculos?.length < 6 ?
  <Stack className="text-center">
    {evento?.hipervinculos?.map((hipervinculo, index) =>
      <OverlayTrigger key={`hipervinculo-${index}`}
                      overlay={<Tooltip className="w-auto">{hipervinculo}</Tooltip>}
      >
        <Button variant="primary-inverse"
                className="nav-link d-inline-block text-truncate"
                href={hipervinculo}
                target="_blank"
        >
          {hipervinculo?.replace(/(^\w+:|^)\/\//, '')}
        </Button>
      </OverlayTrigger>
    )}
  </Stack>
  : null}

      </Stack>
    )
  }

  function onClose() {
    setData(prevState => ({...prevState, eventoActual: undefined}))
  }
}
