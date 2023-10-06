import {useState} from 'react';
import "./CardUsuario.css";
import ModalE from '../ModalEliminacion/ModalE.tsx'
import IUsuario from "../../models/IUsuario";
import Boton from "../Boton";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";

function CardUsuario(usuario: IUsuario) {
  const [estadoM1, cambiarEstadM1] = useState(false);

  return (
    <div key={usuario.id} className='card-usuario'>
      <header>
        <p>#{usuario.id}</p>
        <div className='opciones'>
          <Boton icono={<FaRegEdit/>} onClick={() => {
          }}/>
          <Boton icono={<FaRegTrashAlt/>} onClick={() => cambiarEstadM1(!estadoM1)}/>
        </div>
      </header>
      <section className="card-details">
        <img src="https://picsum.photos/200/300?random=1" alt="" className='redonda'/>
        <p className="UserName">{usuario.nombre}</p>
        <h4 id='email'>{usuario.email}</h4>
        <div id="card-data">
          <p>{Math.floor(Math.random() * 10)} permisos</p>
        </div>
        <div id="card-data">
          <p>{usuario.tipo}</p>
        </div>
      </section>

      <ModalE
        estado={estadoM1}
        cambiarEstado={cambiarEstadM1}>

        <p>¿Estas seguro que desea eliminar el usuario {} ?</p>
        <br/>
        <div className='ContenedorUsuarios'>
          <button id='bcC' onClick={() => cambiarEstadM1(!estadoM1)}>Cancelar<i className="fa fa-ban"
                                                                                aria-hidden="true"></i></button>
          <button id='beC'>Eliminar <i className='bx bx-trash'></i></button>

        </div>
      </ModalE>

    </div>
  );
}

export default CardUsuario;
