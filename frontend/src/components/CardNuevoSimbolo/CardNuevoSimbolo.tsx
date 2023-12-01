import Card from "react-bootstrap/Card";
import Boton from "../Boton";
import { FaPlus } from "react-icons/fa";
import "./_cardnuevosimbolo.scss";

function CardNuevoSimbolo() {
  return (
    <Card className="CardNuevoSimbolo">
      <Card.Body className="text-center d-flex flex-column  justify-content-center align-items-center cardzoom">
        <div className="new-icon">
          <FaPlus/>
        </div>
        <h3>Nuevo Simbolo</h3>
      </Card.Body>
    </Card>
  );
}

export default CardNuevoSimbolo;
