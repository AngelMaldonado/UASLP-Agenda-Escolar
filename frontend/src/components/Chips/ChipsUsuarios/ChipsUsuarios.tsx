import "./_chips-usuario.scss"
import Tooltip from "react-bootstrap/Tooltip";
import {Stack} from "react-bootstrap";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import Usuario from "../../../models/Usuario.ts";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function ChipsUsuarios() {
  const {usuarios} = useObtenSesion().sesion!

  return (
    <Stack direction="horizontal" className="justify-content-center" gap={2}>
      {...chips()}
    </Stack>
  );

  function chips() {
    const chips: React.ReactElement[] = []

    for (let index = 0; index < 5 && index < usuarios?.length!; index++) {
      if ((index + 1) < 5 || usuarios?.length == 5)
        chips.push(chipUsuario(usuarios![index]))
      else {
        chips.push(chipOverflow(usuarios!.slice(index)))
        break
      }
    }

    return chips
  }

  function chipUsuario(usuario: Usuario) {
    const nombres = usuario.nombre?.split(" ")
    const siglas = nombres![0][0] + (nombres && nombres.length > 1 ? nombres[1][0] : "")

    const toolTip = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
        {usuario.nombre}
      </Tooltip>
    )

    return (
      <OverlayTrigger
        key={`chip-usuario-${usuario.id}`}
        placement="bottom"
        overlay={toolTip}
      >
        <div
          className="ChipUsuario position-relative rounded-circle text-center"
          style={{backgroundColor: `hsl(${usuario.color}, 100%, 75%)`}}
        >
          {siglas}
          <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle"></span>
        </div>
      </OverlayTrigger>
    )
  }

  function chipOverflow(usuarios: Usuario[]) {
    const toolTip = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
        {usuarios.map(u => u.nombre).flat()}
      </Tooltip>
    )

    return (
      <OverlayTrigger
        key={`chip-usuarios-overflow`}
        placement="bottom"
        overlay={toolTip}
      >
        <div
          className="ChipUsuario position-relative rounded-circle text-center"
          style={{backgroundColor: "gray"}}
        >
          +{usuarios.length}
          <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle"></span>
        </div>
      </OverlayTrigger>
    )
  }
}

export default ChipsUsuarios
