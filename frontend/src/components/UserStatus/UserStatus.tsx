import React, {useState} from 'react';
import './UserStatus.css'

function UserStatus(props: Props) {

   
    const[cargaImagen, imagenCargada] = useState(false);

    const manejaImagCargada = () => {
        imagenCargada(true);
    }

    return ( <>
        <div style={{position: 'relative'}} className='mx-auto'>
            <div className="redondeaa">
                <img src={props.imageUrl} alt="" onLoad={manejaImagCargada} className='avatar' style={{visibility: cargaImagen ? 'visible' : 'hidden'}}/> 
            </div>
            <div className='circulo' style={{ backgroundColor: props.estado === 1 ? 'var(--error)' : props.estado === 2 ? 'var(--alerta)' : 'var(--exito)'}}/> 
        </div>
       
    </> );
}

export default UserStatus;