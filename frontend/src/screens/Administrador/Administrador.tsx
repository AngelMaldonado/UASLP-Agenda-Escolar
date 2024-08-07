import "./_administrador.scss";
import Filtros from "../../components/Paneles/Filtros";
import Usuarios from "../../components/Paneles/Usuarios";
import NavbarAdmin from "../../components/Navbars/NavbarAdmin";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Calendario from "../../components/Calendario/Calendario";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda";
import {useState} from "react";
import Tab from "react-bootstrap/Tab";
import Simbolos from "../../components/Paneles/Simbolos";
import Agenda from "../../components/Paneles/Agenda";
import TablaEventos from "../../components/TablaEventos/TablaEventos.tsx";
import NavbarInfo from "../../components/Navbars/NavbarInfo";

const idVistaAdministrador = "vista-administrador";

function Administrador() {
  const [key, setKey] = useState("calendario")

  const eventKeysAgenda = ["calendario", "agenda"];
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"];

  return (
    <Tab.Container id={idVistaAdministrador} activeKey={key} onSelect={(k) => setKey(k ?? "calendario")}>
      <NavbarUASLP/>
      <NavbarInfo/>
      <NavbarAgenda currentKey={key} setKey={setKey} eventKeys={eventKeysAgenda}/>
      <NavbarAdmin currentKey={key} setKey={setKey} eventKeys={eventKeysAdmin}/>
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <Calendario/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Agenda/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[0]}>
        <TablaEventos admin/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[1]}>
        <Usuarios/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[2]}>
        <Filtros/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[3]}>
        <Simbolos/>
      </Tab.Pane>,
    ];
  }
}

export default Administrador;
