import './TarjetaLarga.scss'

const TarjetaLarga = () => {
    return (
        <div className="cardLarge">
            <div className="bgColor green"></div>
            <div className="content">
                <div className='bold'>
                    Cursos intersemestrales
                    <div className="pills">
                        <span>Estudiantes</span>
                        <span>Ingenieria</span>
                    </div>
                </div>
                <div className='fechas'>
                    Inicia <br /> 23/10/2023
                    <br /> Termina <br />
                    29/10/2023
                </div>
                <div className='text'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
            </div>
        </div>
    );
}

export default TarjetaLarga;