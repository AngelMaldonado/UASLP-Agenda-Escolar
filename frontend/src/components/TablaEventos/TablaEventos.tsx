import "./TablaEventos.scss";
import Table from "react-bootstrap/Table";
import TablaFilaResponsivo from "./TablaFilaResponsivo.tsx";
import TablaFilas from "./TablaFila.tsx";
import { useContext } from "react";
import { AgendaContext } from "../../providers/AgendaProvider.tsx";

export type TablaEventosProps = {
  admin?: boolean;
};

function TablaEventos(props: TablaEventosProps) {
  const textoBusqueda = useContext(AgendaContext).data.textoBusqueda?.toLowerCase()
  const eventos = useContext(AgendaContext).data.eventos?.filter(e =>
    textoBusqueda && textoBusqueda != "" ? e.nombre!.toLowerCase().includes(textoBusqueda) : true
  )

  return (
    <div className="container table-responsive tableDesplaz-y">
      <br />
      <Table responsive="sm" className="table-hover tablaContenido">
        <thead className="text-center tableHead shadow ">
          <tr>
            <th>Evento</th>
            <th>Simbologia</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Comunidad</th>
            <th>Área</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Hipervinculos</th>
          </tr>
        </thead>
        <tbody className=" tablaEvento text-center shadow">
          {eventos?.map((e) => (
            <TablaFilas
              key={"fila-" + e.id}
              admin={props.admin}
              evento={e}
              filtros_evento={e.filtros}
            />
          ))}
        </tbody>
      </Table>
      {eventos?.map((e) => (
        <TablaFilaResponsivo
          key={"fila-responsive-" + e.id}
          admin={props.admin}
          evento={e}
          filtros_evento={e.filtros}
        />
      ))}
    </div>
  );
}

export default TablaEventos;
