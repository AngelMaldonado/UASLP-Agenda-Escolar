import './TarjetaLarga.scss'
import Evento from '../../models/Evento';


const TarjetaLarga = (props: { evento : Evento}  ) => {
    return (
        <div className="cardLarge">
            <div className="bgColor green"> <img src={props.evento.simbolo} alt="" />  </div>
            <div className="content">
                <div className='bold'>
                    {props.evento.nombre}
                    <div className="pills">
                        <span>Estudiantes</span>
                        <span>Ingenieria</span>
                    </div>
                </div>
                <div className='fechas'>
                    Inicia <br /> {props.evento.fecha_inicio.toString()}
                    <br /> Termina <br /> {props.evento.fecha_fin.toString()}
                    
                </div>
                <div className='text'>
                    {props.evento.descripcion}
                </div>
            </div>
        </div>
    );
}

export default TarjetaLarga;