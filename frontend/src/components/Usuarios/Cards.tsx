import React, {useState} from 'react';
import  "./Cards.css";
import ModalE from '../ModalEliminacion/ModalE'


function Card(props) {

    const [estadoM1,cambiarEstadM1] = useState(false);

    return ( 
    <>
        <div className='card'>
            <div id="card-crud">
                <p id="pcard">{props.numCards}</p>
                <div className="btns">
                    <button id="b1"><i className='bx bx-pencil pencil' ></i></button>
                    <button id="b2" onClick={() => cambiarEstadM1(!estadoM1)}><i className='bx bx-trash trash' ></i></button>
                </div>
            </div>
            <section className="card-details">
                <img src="https://picsum.photos/200/300" alt="" className='redonda' />
                <h2 id='username'>{props.username}</h2>
                <h4 id='email'>{props.email}</h4> 
                <div id="card-data">
                    <p>sdfgfdgsdfg</p>
                </div>
                <div id="card-data">
                    <p>dsgdfgdfsgsdfgfds</p>
                </div>
            </section>

            <ModalE 
                estado = {estadoM1}
                cambiarEstado = {cambiarEstadM1}>
                
                <p>¿Estas seguro que desea eliminar el usuario {props.username} ?</p>
                <br />
                <div className='container'>
                    <button id='bcC' onClick={() => cambiarEstadM1(!estadoM1)}>Cancelar<i className="fa fa-ban" aria-hidden="true"></i> </button>
                    <button id='beC'>Eliminar <i className='bx bx-trash' ></i> </button>

                </div> 
            </ModalE>
           
        </div>


    </> 
    );
}

export default Card;