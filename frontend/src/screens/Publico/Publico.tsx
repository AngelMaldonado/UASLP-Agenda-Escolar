import "./_publico.scss";
// import {useNavigate} from "react-router-dom";
import Calendario from "../../components/Calendario/Calendario.tsx";
import CardCalendario from "../../components/CardCalendario/CardCalendario.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";
import eventos from "../../models/Eventos.ts";
import Tab from "react-bootstrap/Tab";
import TarjetaLarga from "../../components/CardAgenda/CardAgenda.tsx";
import CardCalendarioNotificacion from "../../components/CardCalendarioNotificacion/CardCalendarioNotificacion.tsx";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"];
  // const navigate = useNavigate()
  return (
    <Tab.Container defaultActiveKey={eventKeysAgenda[1]}>
      <header className="header-uaslp"></header>
      {/* <button className='boton --secundario' onClick={() => navigate('/login')}>Administración</button> */}
      <NavbarAgenda eventKeys={eventKeysAgenda} />
      <Tab.Content>{tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos.map((evento) => (
            <TarjetaLarga evento={evento} />
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className="flex">
          <Calendario />
          <div className="smallCalendar">
            {eventos.map((evento) => (
              <CardCalendario evento={evento} />
            ))}

            <CardCalendarioNotificacion />
          </div>
        </div>
      </Tab.Pane>,
    ];
  }
}

export default Publico;
