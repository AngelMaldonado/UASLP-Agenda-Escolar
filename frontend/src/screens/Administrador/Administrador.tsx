// TODO: ver la forma de utilizar rutas para cambiar de tab (#usuarios, #calendario, etc...)

import "./_administrador.scss";
import Filtros from "../../components/Paneles/Filtros";
import Usuarios from "../../components/Paneles/Usuarios";
import TablaEventos from "../../components/TablaEventos";
import NavbarAdmin from "../../components/Navbars/NavbarAdmin";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Calendario from "../../components/Calendario/Calendario";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda";
import {useState} from "react";
import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import Tab from "react-bootstrap/Tab";
import Simbolos from "../../components/Paneles/Simbolos";
import Agenda from "../../components/Paneles/Agenda";
import {TipoEventoEnum} from "../../enums";
import Filtro from "../../models/Filtro.ts";

const idVistaAdministrador = "vista-administrador";

function Administrador() {
  const [mes, setMes] = useState(new Date().getMonth());
  const [key, setKey] = useState("calendario")
  const [filtros, setFiltros] = useState<Filtro[]>([])

  const {eventos} = useObtenEventos(mes);

  const eventKeysAgenda = ["calendario", "agenda"];
  const eventKeysAdmin = ["tabla-eventos", "usuarios", "filtros", "simbolos"];

  eventos?.sort((a, b) => a.fecha_inicio!.getTime() - b.fecha_inicio!.getTime())

  return (
    <Tab.Container id={idVistaAdministrador} activeKey={key} onSelect={(k) => setKey(k ?? "calendario")}>
      <NavbarUASLP/>
      <NavbarAgenda setKey={setKey} eventKeys={eventKeysAgenda} setFiltros={setFiltros} sesionAdmi/>
      <NavbarAdmin setKey={setKey} eventKeys={eventKeysAdmin}/>
      <Tab.Content>{...tabContent()}</Tab.Content>
    </Tab.Container>
  );

  function tabContent() {
    let eventosFiltrados = eventos?.filter(e => {
      if (e.tipo != TipoEventoEnum.ALUMNADO) {
        if (filtros.length > 0)
          return filtros.some(f => e.filtros?.includes(f.id!))
        else if (filtros.length == 0)
          return true
      } else return false
    })

    return [
      <Tab.Pane eventKey={eventKeysAgenda[0]}>
        <div className='flex'>
          <Calendario
            admin
            eventos={eventosFiltrados}
            setMes={setMes}
          />
        </div>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Agenda admin eventos={eventosFiltrados}/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAdmin[0]}>
        {/*<TablaEventos eventos={eventosFiltrados}/>*/}
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
