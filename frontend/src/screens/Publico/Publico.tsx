import "./_publico.scss";
// import {useNavigate} from "react-router-dom";
//import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import Calendario from "../../components/Calendario/Calendario.tsx";
import CardCalendario from "../../components/CardCalendario/CardCalendario.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";
import eventos from "../../models/Eventos.ts";
import Tab from "react-bootstrap/Tab";
import CardAgenda from "../../components/CardAgenda/CardAgenda.tsx";
//import CardCalendarioNotificacion from "../../components/CardCalendarioNotificacion/CardCalendarioNotificacion.tsx";
import {useState} from "react";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"]
  const [mes, setMes] = useState(new Date().getMonth());
  //const {eventos} = useObtenEventos(mes);
  // const navigate = useNavigate()
  return (
    <Tab.Container defaultActiveKey={eventKeysAgenda[1]}>
      <div className="header container-fluid">
        <div className="container">
          <div className="row header">
            <div
              className="col-12 col-md-auto d-flex justify-content-center justify-content-md-start align-items-center">
              <a href="https://www.uaslp.mx">
                <img src="/public/logoUASLP.png" className="img-fluid logoUASLP"/>
              </a>
              <p className="textoUASLP d-none"><a href="https://www.uaslp.mx">UASLP</a></p>

              <div className="divisorUASLP-ENTIDAD me-2 ms-2"></div>
              <div className="divisorUASLP-ENTIDADScroll d-none me-2 ms-3"></div>

              <a href="#" className="me-2">
              </a>
              <p className="textoUASLP d-none me-2">
              </p>
            </div>

            <div className="col-12 col-md-auto d-block d-sm-none">
              <div className="row">
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/3429">Aspirantes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/3396">Estudiantes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2359">Egresados</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2360">Docentes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2361">Administrativos</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarAgenda eventKeys={eventKeysAgenda}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos?.map((evento) => (
            <CardAgenda key={"Card agenda " + evento.nombre} evento={evento}/>
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className='flex'>
          <Calendario eventos={eventos}/>
          <div className='contenedorTarjetas'>
            {eventos?.map((evento) => (
              <CardCalendario key={"Card calendario " + evento.nombre} evento={evento}/>
            ))}
          </div>
        </div>
      </Tab.Pane>,
    ]
  }
}

export default Publico
