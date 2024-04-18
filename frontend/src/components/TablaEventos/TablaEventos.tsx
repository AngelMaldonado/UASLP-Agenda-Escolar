import './TablaEventos.scss'
import {useContext} from 'react';
import Table from 'react-bootstrap/Table';
import {AgendaContext} from "../../providers/AgendaProvider.tsx";
import TablaFilaResponsivo from './TablaFilaResponsivo.tsx';
import TablaFilas from './TablaFila.tsx';

export type TablaEventosProps = {
  admin?: boolean
}

function TablaEventos(props: TablaEventosProps) {

  const eventos = useContext(AgendaContext).data.eventos;
  

  return (
    <div className='container table-responsive tableDesplaz-y'>
    <br/>
    <Table responsive="sm" className='table-hover tablaContenido'>
      <thead className='text-center tableHead shadow '>
      <tr>
        {/* <th>#</th> */}
        <th>Evento</th>
        <th>Simbologia</th>
        <th>Inicio</th>
        <th>Fin</th>
        <th>Comunidad</th>
        <th>Área</th>
        <th>Descripción</th>
        <th>Imagen</th>
        <th>Hipervinculos</th>
        <th></th>
      </tr>
      </thead>
      <tbody className=' tablaEvento text-center shadow'>
      {eventos?.map((e) => (
            <TablaFilas key={e.cat_evento_id} admin={props.admin} evento={e} filtros_evento={e.filtros}/>
      ))}
      </tbody>
    </Table>
    {eventos?.map((events) => (
            <TablaFilaResponsivo key={events.cat_evento_id} admin={props.admin} evento={events} filtros_evento={events.filtros}/>
    ))}
  </div>
  );

}

export default TablaEventos;

