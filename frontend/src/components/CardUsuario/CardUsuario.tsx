import {useState} from 'react';
import "./CardUsuario.css";
import ModalE from '../ModalEliminacion/ModalE.tsx'
import IUsuario from "../../models/IUsuario";

function CardUsuario(usuario: IUsuario) {
  const [estadoM1, cambiarEstadM1] = useState(false);

  return (
    <div key={usuario.id} className='card'>
      <div id="card-crud">
        <header>
          <p>#{usuario.id}</p>
          <button id="b1"><i className='bx bx-pencil pencil'></i></button>
          <button id="b2" onClick={() => cambiarEstadM1(!estadoM1)}><i className='bx bx-trash trash'></i></button>
        </header>
      </div>
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
