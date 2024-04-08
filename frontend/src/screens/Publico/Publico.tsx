import "./_publico.scss";
import Calendario from "../../components/Calendario/Calendario.tsx";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import CardAgenda from "../../components/Cards/CardAgenda/CardAgenda.tsx";
//import CardCalendarioNotificacion from "../../components/CardCalendarioNotificacion/CardCalendarioNotificacion.tsx";
import { useState } from "react";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import { useObtenEventos } from "../../hooks/HooksEvento.ts";
import Agenda from "../../components/Paneles/Agenda";
import { useObtenFiltros } from "../../hooks/HooksFiltro.ts";

const idVistaPublico = "vista-publico";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"];
  const [key, setKey] = useState("calendario");
  const [mes, setMes] = useState(new Date().getMonth());
  const { eventos } = useObtenEventos(mes);
  const { filtros } = useObtenFiltros();

  return (
    <Tab.Container
      id={idVistaPublico}
      activeKey={key}
      onSelect={(k) => setKey(k!)}
    >
      <NavbarUASLP />
      <NavbarAgenda setKey={setKey} eventKeys={eventKeysAgenda} />
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <Calendario eventos={eventos} setMes={setMes} />
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Agenda></Agenda>
      </Tab.Pane>,
    ];
  }
}

export default Publico;
