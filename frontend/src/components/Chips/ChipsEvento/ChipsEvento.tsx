import {FiltrosCategoriaEnum} from "../../../enums/FiltroCategoriaEnum.ts";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Badge, Stack} from "react-bootstrap";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

type ChipsEventoProps = {
  noFloat?: boolean,
  filtros_evento?: number[]
}

export function ChipsEvento(props: ChipsEventoProps) {
  const filtros = useContext(AgendaContext).data.filtros

  const areas = filtros?.filter(f =>
    props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.AREA
  )

  const comunidades = filtros?.filter(f =>
    props.filtros_evento?.includes(f.id!) && f.categoria == FiltrosCategoriaEnum.COMUNIDAD
  )

  return (
    <div className={`pills ${props.noFloat ? "noFloat" : ""}`}>
      <OverlayTrigger
        key="pills-areas"
        placement="top"
        overlay={
          <Tooltip>
            <Stack>
              {areas?.map((area, index) => (
                <span key={`pill-${index}-${area.nombre}`}>{area.nombre}</span>
              ))}
            </Stack>
          </Tooltip>
        }
      >
        <span>Áreas <Badge>{areas?.length}</Badge></span>
      </OverlayTrigger>
      <OverlayTrigger
        key="pills-comunidades"
        placement="top"
        overlay={
          <Tooltip>
            <Stack>
              {comunidades?.map((comunidad, index) => (
                <span key={`pill-${index}-${comunidad.nombre}`}>{comunidad.nombre}</span>
              ))}
            </Stack>
          </Tooltip>
        }
      >
        <span>Comunidades <Badge>{comunidades?.length}</Badge></span>
      </OverlayTrigger>
    </div>
  );
}
