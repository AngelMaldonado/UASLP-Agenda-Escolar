import CirculoTarjeta from '../CirculoTarjeta/CirculoTarjeta';
import './TarjetaCalendario.scss'
import '../../utils/_colors.scss'
import Evento from '../../models/Evento';

const TarjetaCalendario = ( props: { evento : Evento}   ) => {
    return (
        <div className="card">
           <CirculoTarjeta  
                ruta = {props.evento.ruta}  
                fechaInicio = {props.evento.fecha_inicio}
                fechaFin = {props.evento.fecha_fin} 
            />

            <div className="text-start">
                Texto
            </div>
            <div className="pills">
                <span>Estudiantes</span>
                <span>Ingenieria</span>
            </div>
        </div>
    );
}

export default TarjetaCalendario;