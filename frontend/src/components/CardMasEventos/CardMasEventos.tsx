import "./_cardmaseventos.scss";
import { GoPencil } from "react-icons/go";
import { BsFillTrash3Fill } from "react-icons/bs";
import Boton from "../Boton";
import { TemaComponente } from "../../utils/Utils";
import { AiOutlineExport } from "react-icons/ai";

const CardMasEventos = () => {
  return (
    <div className="cardMasEventos">
      <div className="content">
        <img src="./src/assets/pokemon.jpg" alt="" />
        <div className="title">TACOS LOCOS</div>
        <div className="fecha">29 de abril 2023:</div>
        <div className="verMas">
          <Boton
            etiqueta="Ver mas"
            icono={<AiOutlineExport />}
            variant={TemaComponente.Secundario}
          />
        </div>
        <div className="bottons">
          <Boton
            icono={<GoPencil />}
            clase="circle"
            variant={TemaComponente.PrimarioInverso}
          />

          <Boton
            icono={<BsFillTrash3Fill />}
            clase="circle"
            variant={TemaComponente.DangerInverso}
          />
        </div>
      </div>
    </div>
  );
};

export default CardMasEventos;
