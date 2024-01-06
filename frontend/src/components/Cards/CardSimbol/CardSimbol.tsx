import Card from 'react-bootstrap/Card';
import Boton from "../../Inputs/Boton";
import {FaRegEdit} from "react-icons/fa";
import './_cardsimbolo.scss';
import {BsFillTrash3Fill} from "react-icons/bs";
import {TemaComponente} from '../../../utils/Utils.ts';


function CardSimbol() {
  return (
    <Card style={{width: '17rem', height: '20rem', padding: '0px 0px 10px 0px'}} className="CardSimbol">
      <Card.Body className='text-center align-items-center'>
        <div className='d-flex justify-content-around align-items-center'>

          <Boton
            rounded={true}
            icono={<FaRegEdit/>}
            clase='circle'
            variant={TemaComponente.PrimarioInverso}
          />

          <Boton
            rounded={true}
            icono={<BsFillTrash3Fill/>}
            clase='circle'
            variant={TemaComponente.DangerInverso}

          />
        </div>
        <img src="./src/assets/pokemon.jpg" alt="" style={{width: '80%', height: '85%', margin: '10px 0px'}}/>
      </Card.Body>
    </Card>
  );
}

export default CardSimbol;
