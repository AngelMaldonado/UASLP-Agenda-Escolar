// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)

import "./_administrador.scss";
import "./Site.css"
import NavbarAdmin from "../../components/NavbarAdmin";
import Usuarios from "../../components/Usuarios/Usuarios.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import Calendario from "../../components/Calendario/Calendario";
import CardCalendario from "../../components/CardCalendario/CardCalendario.tsx";
import TarjetaLarga from "../../components/CardAgenda/CardAgenda.tsx";
import CardNuevoSimbolo from "../../components/CardNuevoSimbolo";
import CardSimbol from "../../components/CardSimbol/CardSimbol.tsx";
import Filtros from "../../components/Filtros/Filtros.tsx";
import TablaEventos from "../../components/TablaEventos/TablaEventos.tsx";
import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import {useState} from "react";
import eventos from "../../models/Eventos.ts";

const idVistaAdministrador = "vista-administrador";

function Administrador() {
  //const [date, setDate] = useState(new Date());
  const [mes, setMes] = useState(new Date().getMonth());
  const {eventosBD} = useObtenEventos(mes);

  const eventKeysAgenda = ["calendario", "agenda"];
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"];

  return (
    <Tab.Container id={idVistaAdministrador} defaultActiveKey={"agenda"}>
      <div className="header container-fluid">
        <div className="container">
          <div className="row header">
            <div
              className="col-12 col-md-auto d-flex justify-content-center justify-content-md-start align-items-center">
              <a href="https://www.uaslp.mx">
                <img src="/public/logoUASLP.png" className="img-fluid logoUASLP"/>
              </a>
              <p className="textoUASLP d-none"><a href="https://www.uaslp.mx">UASLP</a></p>

              <div className="divisorUASLP-ENTIDAD me-2 ms-2"></div>
              <div className="divisorUASLP-ENTIDADScroll d-none me-2 ms-3"></div>

              <a href="#" className="me-2">
              </a>
              <p className="textoUASLP d-none me-2">
              </p>
            </div>

            <div className="col-12 col-md-auto d-block d-sm-none">
              <div className="row">
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/3429">Aspirantes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/3396">Estudiantes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2359">Egresados</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2360">Docentes</a></div>
                <div className="col px-1"><a href="https://www.uaslp.mx/Paginas/Perfiles/2361">Administrativos</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <TarjetaLarga key={"Card agenda " + evento.nombre} evento={evento}/>
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
