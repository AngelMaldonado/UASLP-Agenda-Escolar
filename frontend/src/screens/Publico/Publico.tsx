import "./_publico.scss";
import Calendario from "../../components/Calendario/Calendario.tsx";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import CardAgenda from "../../components/Cards/CardAgenda/CardAgenda.tsx";
//import CardCalendarioNotificacion from "../../components/CardCalendarioNotificacion/CardCalendarioNotificacion.tsx";
import { useState } from "react";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Agenda from "../../components/Paneles/Agenda";

const idVistaPublico = "vista-publico";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"];
  const [key, setKey] = useState("calendario");

  return (
    <Tab.Container id={idVistaPublico} activeKey={key}>
      <NavbarUASLP />
      <NavbarAgenda
        currentKey={key}
        setKey={setKey}
        eventKeys={eventKeysAgenda}
      />
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <Calendario />
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Agenda />
      </Tab.Pane>,
    ];
  }
}

export default Publico;
