// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)
// TODO: solucionar error: 'React does not recognize the `eventKey` prop on a DOM element.'

import "./_administrador.scss"
import NavbarAdmin from "../../components/NavbarAdmin"
import Usuarios from "../../components/Usuarios/Usuarios.tsx"
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx"
//import {useState} from "react"
import Tab from "react-bootstrap/Tab"
import Calendario from '../../components/Calendario/Calendario';
import CardCalendario from '../../components/CardCalendario/CardCalendario.tsx';
import eventos from "../../models/Eventos.ts";
import TarjetaLarga from "../../components/CardAgenda/CardAgenda.tsx";
import Filtros from "../../components/Filtros/Filtros.tsx"
import CardFiltro from "../../components/CardFiltro/CardFiltro.tsx"

const idVistaAdministrador = "vista-administrador"

function Administrador() {
  //const [date, setDate] = useState(new Date());
  const eventKeysAgenda = ["calendario", "agenda"]
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"]

  return (
    <Tab.Container id={idVistaAdministrador} defaultActiveKey={"calendario"}>
      <header className='header-uaslp'></header>
      <NavbarAgenda eventKeys={eventKeysAgenda} sesionAdmi={true}/>
      <NavbarAdmin eventKeys={eventKeysAdmin}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className="container my-4 d-flex flex-column gap-5">
          {eventos.map((evento) => (
            <TarjetaLarga evento={evento}/>
          ))}
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <div className='flex'>
          <Calendario/>
          <div className='smallCalendar'>
            {eventos.map((evento) => (
              <CardCalendario evento={evento}/>
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
        <Filtros />
        {/* <CardFiltro/> */}
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[3]}>
        <h1>Símbolos...</h1>
      </Tab.Pane>
    ]
  }
}

export default Administrador
