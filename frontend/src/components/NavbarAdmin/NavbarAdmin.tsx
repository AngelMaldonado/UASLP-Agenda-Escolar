import './_navbaradmin.scss'
import Boton from "../Boton";
import {TemaComponente} from "../../utils/Utils.ts";
import {ReactComponentElement, useState} from "react";
import {FaRegCalendarAlt, FaRegFileImage, FaRegPlusSquare, FaRegUser, FaStream} from 'react-icons/fa'
import Campo from "../Campo";

function NavbarAdmin() {
  const [tabIndex, setTabIndex] = useState(0)
  const cambiaOpcion = (n: number) => {
    setTabIndex(n)
  }

  const opciones: ReactComponentElement<typeof Boton>[] = [
    <Boton tema={TemaComponente.PrimarioInverso} etiqueta="Tabla de Eventos" icono={<FaRegCalendarAlt/>}
           onClick={() => cambiaOpcion(0)}/>,
    <Boton tema={TemaComponente.PrimarioInverso} etiqueta="Usuarios" icono={<FaRegUser/>}
           onClick={() => cambiaOpcion(1)}/>,
    <Boton tema={TemaComponente.PrimarioInverso} etiqueta="Filtros" icono={<FaStream/>}
           onClick={() => cambiaOpcion(2)}/>,
    <Boton tema={TemaComponente.PrimarioInverso} etiqueta="Símbolos" icono={<FaRegFileImage/>}
           onClick={() => cambiaOpcion(3)}/>,
    <Boton tema={TemaComponente.PrimarioInverso} etiqueta="Crear Evento" icono={<FaRegPlusSquare/>}
           onClick={() => alert('Formulario Nuevo Evento')}/>
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-blanco-80">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Campo id="busqueda" placeholder="Placeholder...."/>
        </div>
        <ul className="navbar-nav gap-2 me-auto mb-2 mb-lg-0">
          {opciones.map((opcion, index) => (<li key={index}>{opcion}</li>))}
        </ul>
      </div>
    </nav>
  );
}

export default NavbarAdmin
