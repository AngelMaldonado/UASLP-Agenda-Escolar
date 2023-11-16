import Card from 'react-bootstrap/Card';
import Boton from "../Boton";
import {FaPlus} from "react-icons/fa";
import './CardNewSimbol.scss';



function CardNewSimbol() {
  return (
    <Card className="CardNewSimbol">
      <Card.Body className='text-center d-flex flex-column  justify-content-center align-items-center cardzoom'>

                    <Boton 
                     
                        className='mx-auto'
                        icono={<FaPlus/>}
                    />
                Nuevo Simbolo
      </Card.Body>
    </Card>
  );
}

export default CardNewSimbol;