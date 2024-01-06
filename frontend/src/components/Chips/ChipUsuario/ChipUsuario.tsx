import "./_chip-usuario.scss"
import Usuario from "../../../models/Usuario.ts";
import Tooltip from "react-bootstrap/Tooltip";
import {Button, Image, Overlay} from "react-bootstrap";
import {useRef, useState} from "react";

export type ChipUsuarioProps = {
  usuarios: Usuario[]
}

function ChipUsuario(props: ChipUsuarioProps) {
  const {usuarios} = props
  const [muestra, setMuestra] = useState(false)
  const target = useRef(null)

  return (
    <div className="ChipUsuario position-relative">
      {usuarios.length == 1 ?
        <>
          <Image src="https://i.pravatar.cc/300" roundedCircle/>
          <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle"></span>
        </>
        :
        <>
          <Button ref={target}
                  variant="outline-light"
                  className="rounded-circle h-100 w-100 p-0"
                  onClick={() => setMuestra(!muestra)}>
            {usuarios.length.toString()}
          </Button>
          <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle"></span>
        </>
      }
      <Overlay target={target.current} show={muestra} placement="bottom">
        {(props) => (
          <Tooltip id="usuarios-conectados-tooltip" {...props}>
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="w-100 d-flex align-items-center gap-2 my-1">
                <div className="w-25 position-relative text-truncate">
                  <Image className="w-100" src="https://i.pravatar.cc/300" roundedCircle/>
                  <span className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle"></span>
                </div>
                <div className="w-100 text-truncate">
                  Nombre del usuarioooo
                </div>
              </div>
            ))}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default ChipUsuario
