import './_publico.scss'
// import {useNavigate} from "react-router-dom";
import Calendario from "../../components/Calendario/Calendario.tsx";
import CardCalendario from "../../components/CardCalendario/CardCalendario.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx"
import eventos from "../../models/Eventos.ts";
import Tab from "react-bootstrap/Tab";
import TarjetaLarga from "../../components/CardAgenda/CardAgenda.tsx";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"]
  // const navigate = useNavigate()
  return (
    <Tab.Container defaultActiveKey={"calendario"}>
      <header className='header-uaslp'></header>
      <header className='header-agenda'>
        <button className='boton --secundario' onClick={() => navigate('/login')}>Administración</button>
      </header>
      <NavbarAdmin eventKeys={[]}/>
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

    </>
  );
}

export default Publico
