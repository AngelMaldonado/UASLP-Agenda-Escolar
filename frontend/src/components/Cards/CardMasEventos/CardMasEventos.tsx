import "./_cardmaseventos.scss";
import Evento from '../../../models/Evento.ts';
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Tipos.ts";
import {AiOutlineExport} from "react-icons/ai";
import {modalEvento} from "../../Modales/ModalEliminarEditarEvento/ModalEliminarEditar.tsx";
import {Configuraciones} from "../../../utils/Constantes.ts";

function CardMasEventos(props: { evento: Evento }) {
  const {evento} = props

  return (
    <div className="cardMasEventos">
      <div className="content">
        <img src={Configuraciones.publicURL + props.evento.imagen} alt={"Símbolo " + props.evento.nombre}/>
        <div className="title">{evento.nombre}</div>
        <div className="fecha">{Intl.DateTimeFormat("es-MX").format(evento.fecha_inicio)}</div>
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
