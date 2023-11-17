// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)

import "./_administrador.scss";
import NavbarAdmin from "../../components/NavbarAdmin";
import Usuarios from "../../components/Usuarios/Usuarios.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import Calendario from "../../components/Calendario/Calendario";
import CardCalendario from "../../components/CardCalendario/CardCalendario.tsx";
import eventos from "../../models/Eventos.ts";
import TarjetaLarga from "../../components/CardAgenda/CardAgenda.tsx";
import CardNuevoSimbolo from "../../components/CardNuevoSimbolo";
import CardSimbol from "../../components/CardSimbol/CardSimbol.tsx";

const idVistaAdministrador = "vista-administrador";

function Administrador() {
  //const [date, setDate] = useState(new Date());
  const eventKeysAgenda = ["calendario", "agenda"];
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"];

  return (
    <Tab.Container id={idVistaAdministrador} defaultActiveKey={"agenda"}>
      <header className="header-uaslp"></header>
      <NavbarAgenda eventKeys={eventKeysAgenda} sesionAdmi={true}/>
      <NavbarAdmin eventKeys={eventKeysAdmin}/>
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos.map((evento) => (
            <TarjetaLarga key={"Card agenda " + evento.nombre} evento={evento}/>
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className='flex'>
          <Calendario/>
          <div className='contenedorTarjetas admin'>
            {eventos.map((evento) => (
              <CardCalendario key={"Card calendario" + evento.nombre} admin={true} evento={evento}/>
            ))}
          </div>
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[0]}>
        <h1>Tabla eventoasdfasdfasdfasdfs</h1>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[1]}>
        <Usuarios/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[2]}>
        <h1>Filtros...</h1>
        {/*<Filtros />*/}
        {/* <CardFiltro/> */}
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[3]}>
        <div className="d-flex justify-content-around p-5">
          <CardNuevoSimbolo/>
          <CardSimbol/>
          <CardSimbol/>
          <CardSimbol/>
          <CardSimbol/>
          <CardSimbol/>
        </div>
      </Tab.Pane>,
    ];
  }
}

export default Administrador;
