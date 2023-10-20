import "./_chipusuario.scss"
import {TamanoComponente} from "../../utils/Utils.ts";

interface ChipUsuarioProps {
  tamano: TamanoComponente,
}

function ChipUsuario(props: ChipUsuarioProps) {
  return (
    <div className={"position-relative " + "chip-usuario-" + props.tamano}>
      <img className="rounded-circle img-fluid" src="https://i.pravatar.cc/300" alt="Imagen de usuario X"/>
      <span className="position-absolute bottom-0 end-0 p-2 bg-success rounded-circle"></span>
    </div>
  );
}

export default ChipUsuario
