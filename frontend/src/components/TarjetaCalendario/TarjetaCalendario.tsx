import CirculoTarjeta from '../CirculoTarjeta/CirculoTarjeta';
import './TarjetaCalendario.css'

const TarjetaCalendario = () => {
    return (
        <div className="card">
           <CirculoTarjeta />
            <div className="text-start">
                Texto
            </div>
        </div>
    );
}

export default TarjetaCalendario;