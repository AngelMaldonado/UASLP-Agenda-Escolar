import "./_cardmaseventos.scss";
import Evento from '../../../models/Evento.ts';
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";
import {AiOutlineExport} from "react-icons/ai";
import { modalEvento } from "../../Modales/ModalEliminarEditarEvento/ModalEliminarEditar.tsx";

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
            {modalEvento(props)}
         </div>
      </div>
    </div>
  );
  
}

export default CardMasEventos;
