import "./_publico.scss";
import Calendario from "../../components/Calendario/Calendario.tsx";
import NavbarAgenda from "../../components/Navbars/NavbarAgenda/NavbarAgenda.tsx";
import Tab from "react-bootstrap/Tab";
import {useState} from "react";
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import {useObtenEventos} from "../../hooks/HooksEvento.ts";
import Agenda from "../../components/Paneles/Agenda";
import Filtro from "../../models/Filtro.ts";
import {TipoEventoEnum} from "../../enums";

const idVistaPublico = "vista-publico";

function Publico() {
  const eventKeysAgenda = ["calendario", "agenda"]
  const [key, setKey] = useState("calendario")
  const [filtros, setFiltros] = useState<Filtro[]>([])
  const [mes, setMes] = useState(new Date().getMonth());
  const {eventos} = useObtenEventos(mes);

  eventos?.sort((a, b) => a.fecha_inicio!.getTime() - b.fecha_inicio!.getTime())

  return (
    <Tab.Container id={idVistaPublico} activeKey={key} onSelect={(k) => setKey(k!)}>
      <NavbarUASLP/>
      <NavbarAgenda setKey={setKey} eventKeys={eventKeysAgenda} setFiltros={setFiltros}/>
      <Tab.Content>
        {...tabContent()}
      </Tab.Content>
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
        <Calendario eventos={eventosFiltrados} setMes={setMes}/>
      </Tab.Pane>,
      <Tab.Pane eventKey={eventKeysAgenda[1]}>
        <Agenda eventos={eventosFiltrados} filtros={filtros}/>
      </Tab.Pane>,
    ]
  }
}

export default Publico
