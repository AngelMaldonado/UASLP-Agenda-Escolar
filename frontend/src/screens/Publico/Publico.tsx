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
<<<<<<< HEAD
      <NavbarAgenda eventKeys={eventKeysAgenda} />
      <Tab.Content>{tabContent()}</Tab.Content>
=======
      <NavbarAgenda eventKeys={eventKeysAgenda}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos.map((evento) => (
<<<<<<< HEAD
            <TarjetaLarga evento={evento} />
=======
            <TarjetaLarga key={"Card agenda " + evento.nombre} evento={evento}/>
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
<<<<<<< HEAD
        <div className="flex">
          <Calendario />
          <div className="smallCalendar">
            {eventos.map((evento) => (
              <CardCalendario evento={evento} />
=======
        <div className='flex'>
          <Calendario/>
          <div className='contenedorTarjetas'>
            {eventos.map((evento) => (
              <CardCalendario key={"Card calendario " + evento.nombre} evento={evento}/>
>>>>>>> da1419496d00073123a03ca075a9722208ce75d8
            ))}

            <CardCalendarioNotificacion />
          </div>
        </div>
      </Tab.Pane>,
    ];
  }
}

export default Publico;
