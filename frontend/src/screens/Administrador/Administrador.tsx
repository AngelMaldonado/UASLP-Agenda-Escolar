// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)
// TODO: solucionar error: 'React does not recognize the `eventKey` prop on a DOM element.'

import "./_administrador.scss"
import NavbarAdmin from "../../components/NavbarAdmin"
import Usuarios from "../../components/Usuarios/Usuarios.tsx"
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx"
import Calendar from 'react-calendar'
//import {useState} from "react"
import Tab from "react-bootstrap/Tab"
import 'react-calendar/dist/Calendar.css'
import Calendario from '../../components/Klendario/Calendario';
import TarjetaCalendario from '../../components/TarjetaCalendario/TarjetaCalendario';

const idVistaAdministrador = "vista-administrador"

function Administrador() {
  //const [date, setDate] = useState(new Date());
  const eventKeysAgenda = ["calendario", "agenda"]
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"]

  return (
    <Tab.Container id={idVistaAdministrador} defaultActiveKey={"calendario"}>
      <header className='header-uaslp'></header>
      <NavbarAgenda eventKeys={eventKeysAgenda}/>
      <NavbarAdmin eventKeys={eventKeysAdmin}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className='flex'>
          <Calendario/>
          <div className='smallCalendar'>
              <Calendar 
                locale = 'es'
               />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
              <TarjetaCalendario />
            </div>
          </div>
      

      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Calendar/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[2]}>
        <></>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[0]}>
        <h1>Tabla eventoasdfasdfasdfasdfs</h1>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[1]}>
        <Usuarios/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[2]}>
        <h1>Filtros...</h1>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[3]}>
        <h1>Símbolos...</h1>
      </Tab.Pane>
    ]
  }
}

export default Administrador
