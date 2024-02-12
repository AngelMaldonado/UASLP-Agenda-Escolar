import "./_publico.scss";
// import {useNavigate} from "react-router-dom";
//import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import Calendario from "../../components/Calendario/Calendario.tsx";
import CardCalendario from "../../components/Cards/CardCalendario/CardCalendario.tsx";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import CardAgenda from "../../components/Cards/CardAgenda/CardAgenda.tsx";
//import CardCalendarioNotificacion from "../../components/CardCalendarioNotificacion/CardCalendarioNotificacion.tsx";
import {useState} from "react";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import {useObtenEventos} from "../../hooks/HooksEvento.ts";

const idVistaPublico = "vista-publico";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"]
  const [key, setKey] = useState("calendario")
  const [mes, setMes] = useState(new Date().getMonth());
  const {eventos} = useObtenEventos(mes);
  // const navigate = useNavigate()
  return (
    <Tab.Container id={idVistaPublico} activeKey={key} onSelect={(k) => setKey(k!)}>
      <NavbarUASLP/>
      <NavbarAgenda setKey={setKey} eventKeys={eventKeysAgenda}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className='flex'>
          <Calendario eventos={eventos} setMes={setMes}/>
          <div className='contenedorTarjetas'>
            {eventos?.map((evento) => (
              <CardCalendario key={"Card calendario " + evento.nombre} evento={evento}/>
            ))}
          </div>
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos?.map((evento) => (
            <CardAgenda key={"Card agenda " + evento.nombre} evento={evento}/>
          ))}
        </div>
      </Tab.Pane>,
    ]
  }
}

export default Publico
