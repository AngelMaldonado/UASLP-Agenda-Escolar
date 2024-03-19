import "./_cardmaseventos.scss";
import Evento from '../../../models/Evento.ts';
import {GoPencil} from "react-icons/go";
import {BsFillTrash3Fill} from "react-icons/bs";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";
import {AiOutlineExport} from "react-icons/ai";

function CardMasEventos(props: { evento: Evento }) {
  return (
    
    <div className="cardMasEventos  ">
      <div className="content">
        <img src="https://i.pravatar.cc/300" alt=""/>
        <div className="title">{props.evento?.nombre}</div>
        <div className="fecha">{Intl.DateTimeFormat("es-MX").format(props.evento?.fecha_inicio)}</div>
        <div className="verMas">
          <Boton
            etiqueta="Ver evento"
            icono={<AiOutlineExport/>}
            variant={TemaComponente.PrimarioInverso}
          />
        </div>
        <div className="bottons">
          <Boton 
            icono={<GoPencil/>}
            rounded="true"
            variant={TemaComponente.PrimarioInverso}
          />

          <Boton
            icono={<BsFillTrash3Fill/>}
            rounded="true"
            variant={TemaComponente.DangerInverso}
          />
        </div>
      </div>
    </div>
  );
}

export default CardMasEventos;
