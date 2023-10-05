import './CardFiltro.css'
import Boton from "../Boton";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";

function CardFiltro() {
  return (
    <div className='CardFiltro'>
      <header>
        <Boton icono={<FaRegEdit/>} onClick={() => {
        }}/>
        <Boton icono={<FaRegTrashAlt/>} onClick={() => {
        }}/>
      </header>
      <div className='CardFiltro__Img'></div>
    </div>
  );
}

export default CardFiltro
