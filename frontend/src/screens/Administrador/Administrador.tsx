// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)

import "./_administrador.scss";
import Filtros from "../../components/Paneles/Filtros";
import Usuarios from "../../components/Paneles/Usuarios";
import TablaEventos from "../../components/TablaEventos";
import CardAgenda from "../../components/Cards/CardAgenda";
import NavbarAdmin from "../../components/Navbars/NavbarAdmin";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Calendario from "../../components/Calendario/Calendario";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda";
import CardCalendario from "../../components/Cards/CardCalendario";
import {useState} from "react";
import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import Tab from "react-bootstrap/Tab";
import eventos from "../../models/Eventos.ts";
import Simbolos from "../../components/Paneles/Simbolos";

const idVistaAdministrador = "vista-administrador";

function Administrador() {
  //const [date, setDate] = useState(new Date());
  const [mes, setMes] = useState(new Date().getMonth());
  const {eventosBD} = useObtenEventos(mes);

  const eventKeysAgenda = ["calendario", "agenda"];
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"];

  return (
    <Tab.Container id={idVistaAdministrador} defaultActiveKey={"agenda"}>
      <NavbarUASLP/>
      <NavbarAgenda eventKeys={eventKeysAgenda} sesionAdmi={true}/>
      <NavbarAdmin eventKeys={eventKeysAdmin}/>
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventosBD?.map((evento) => (
            <CardAgenda key={"Card agenda " + evento.nombre} evento={evento}/>
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className='flex'>
          <Calendario eventos={eventos}/>
          <div className='contenedorTarjetas admin'>
            {eventosBD?.map((evento) => (
              <CardCalendario key={"Card calendario" + evento.nombre} admin={true} evento={evento}/>
            ))}
          </div>
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[0]}>
        <div className=''>
          <TablaEventos eventos={eventos}/>
        </div>
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
