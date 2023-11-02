import './CirculoTarjeta.css'

type simbologiaRuta = {
    ruta: string, 
    fechaInicio: Date, 
    fechaFin: Date,
    
 }

const CirculoTarjeta = ( props: simbologiaRuta ) => {
    return (
        <div className="circle" > 
            <img src= {props.ruta} alt=""/>
            <small>{props.fechaInicio.toString()}</small>
            {props.fechaFin.toString()}
        </div>
    );
}

export default CirculoTarjeta;