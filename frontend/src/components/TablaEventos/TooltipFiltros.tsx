import { Stack } from "react-bootstrap";
import Filtro from "../../models/Filtro.ts";
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function TooltipFiltro(filtros: Filtro[] | undefined ) {
    return (
      <OverlayTrigger
        key={"tooltip"}
        placement={"bottom"}
        overlay={
          <Tooltip>
             <Stack>
              {filtros?.map((filtro, index) => (
                <span key={`pill-${index}-${filtro.nombre}`}>{filtro.nombre}</span>
              ))}
            </Stack>
          </Tooltip>
        }
      >
        <Button variant="secondary">{filtros?.length} </Button>
      </OverlayTrigger>
    );
  }


  export default TooltipFiltro;