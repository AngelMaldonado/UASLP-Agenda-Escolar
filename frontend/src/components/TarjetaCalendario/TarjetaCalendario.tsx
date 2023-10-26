import CirculoTarjeta from '../CirculoTarjeta/CirculoTarjeta';
import './TarjetaCalendario.scss'

const TarjetaCalendario = () => {
    return (
        <div className="card">
           <CirculoTarjeta />
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