import './TablaEventos.scss'
import Boton from '../Inputs/Boton';
import {useState} from 'react';
import Modal from '../Modales/Modal/index.ts';
import {FcCancel} from "react-icons/fc";
import Table from 'react-bootstrap/Table';
import Areas from "../../models/Areas.ts";
import Button from 'react-bootstrap/Button';
import Evento from "../../models/Evento.ts";
import Tooltip from 'react-bootstrap/Tooltip';
import {TemaComponente} from '../../utils/Utils';
import Comunidades from "../../models/Comunidades.ts";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import FormularioEvento from '../Formularios/FormularioEvento/FormularioEvento.tsx';
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaTimes, FaTrash} from "react-icons/fa";

type Eventos = {
  eventos: Evento[];
}


function TablaEventos(props: Eventos) {

  return (

    <div className='container table-responsive tableDesplaz-y'>
      <br/>
      <Table responsive="sm" className='table-hover'>
        <thead className='text-center tableHead shadow '>
        <tr>
          <th>#</th>
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
        {props.eventos.map((events) => (
          <tr className=''>
            <td>{events.cat_evento_id}</td>
            <td>{events.nombre}</td>
            <td>
              <div className='image-container'>
                  <span className='w-75'>
                    <img src={events.simbolo} alt="" className='img-fluid'/>
                  </span>
              </div>
            </td>
            <td>{Intl.DateTimeFormat('es-MX').format(events?.fecha_inicio).toUpperCase()}</td>
            <td>{Intl.DateTimeFormat('es-MX').format(events?.fecha_fin).toUpperCase()}</td>
            <td>
              {/* {obtenComunidades({ comunidades: events.comunidades})} */}
              <div className='d-flex justify-content-center'>
                {TooltipPositionedExample(obtenComunidades(events.comunidades), events.nombre)}
              </div>

            </td>
            <td>
              <div className='d-flex justify content-center'>
                {TooltipPositionedExample(obtenAreas(events.areas), events.nombre)}
              </div>
            </td>
            <td>{events.descripcion}</td>
            <td>
              <div className='image-container'>
                  <span className='w-75'>
                    <img src='https://picsum.photos/200/300'/*src={events.imagen}*/ alt="" className='img-fluid '/>
                  </span>
              </div>
            </td>
            <td>{events.hipervinculos}</td>
            <td>
              <div className='d-flex-column'>
                {botonEliminar(events)}
                {botonEdicion(events)}
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );


  function obtenComunidades(comunidades: number[]) {

    return comunidades.map(comunidad => {

      const opcionEncontrada = Comunidades.find(opcion => opcion.value === comunidad);

      if (opcionEncontrada != undefined) {
        return opcionEncontrada.label;
      } else {
        return "";
      }

    })
  }

  function obtenAreas(areas: number[]) {

    return areas.map(comunidad => {

      const opcionEncontrada = Areas.find(opcion => opcion.value === comunidad);

      if (opcionEncontrada != undefined) {
        return opcionEncontrada.label;
      } else {
        return "";
      }

    })
  }

}


function botonEdicion(events: Evento) {
  const [evento, setEvento] = useState(events);
  const [muestraModalModifEvento, setMostrarModalModificar] = useState(false)


  const cambiaEvento = {
    onSingleChange: ((field: string, value: string | Date | number) => setEvento(prevState => ({
      ...prevState, [field]: value,
    }))),
    onMultipleChange: ((field: string, value: any) => {
      let elementos = evento[field as keyof typeof evento] as any[]
      if (elementos.find(elemento => elemento == value)) {
        elementos.splice(elementos.indexOf(value), 1)
      } else {
        elementos.push(value)
      }
      setEvento(prevState => ({...prevState, [field]: elementos}))
    }),
  }
  return (
    <Modal
      titulo={<div><FaRegCalendarAlt/><p className="fs-5">Modificar Evento</p></div>}
      trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
      contenido={<FormularioEvento evento={evento} {...cambiaEvento}/>}
      mostrar={muestraModalModifEvento}
      muestraModal={muestraModalModificar}
      ocultaModal={ocultaModalModificar}
      botones={[
        <Boton key={"boton-caneclar"}
               variant={TemaComponente.PrimarioInverso}
               etiqueta="Cancelar"
               icono={<FaTimes/>}
               onClick={ocultaModalModificar}/>,
        <Boton key={"boton-eliminar"}
               variant={TemaComponente.DangerInverso}
               etiqueta="Eliminar"
               icono={<FaTrash/>}
        />,
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               etiqueta="Guardar"
               icono={<FaRegPlusSquare/>}
               onClick={() => {
                 if (FormularioEvento.valida()) {
                   //modificaUsuario(usuarioState)
                   ocultaModalModificar()
                 }
               }}
        />
      ]}
    />
  )

  function muestraModalModificar() {
    setMostrarModalModificar(true)
  }

  function ocultaModalModificar() {
    setMostrarModalModificar(false)
  }
}


function botonEliminar(evento: Evento) {

  const [muestraModalEliminarEvento, setMostrarModalEliminar] = useState(false)

  return (
    <Modal
      titulo={<div><FaRegCalendarAlt/><p className="fs-5">Eliminar Evento</p></div>}
      trigger={<Boton rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
      contenido={<p className="fs-5 text-center">¿Esta seguro que desea eliminar el
        usuario <strong> [{evento.nombre}]</strong>?</p>}
      mostrar={muestraModalEliminarEvento}
      muestraModal={muestraModalEliminar}
      ocultaModal={ocultaModalEliminar}
      botones={[
        <Boton key={"boton-caneclar"}
               variant={TemaComponente.DangerInverso}
               etiqueta="Cancelar"
               icono={<FcCancel/>}
               onClick={ocultaModalEliminar}/>,
        <Boton key={"boton-eliminar"}
               variant={TemaComponente.PrimarioInverso}
               etiqueta="Eliminar"
               icono={<FaTrash/>}
               onClick={() => {
                 //eliminaUsuario(usuarioState)
                 ocultaModalEliminar()
               }}
        />
      ]}
    />
  )

  function muestraModalEliminar() {
    setMostrarModalEliminar(true)
  }

  function ocultaModalEliminar() {
    setMostrarModalEliminar(false)
  }

}


function TooltipPositionedExample(filtros: string[], id: string) {
  return (
    <OverlayTrigger
      key={"tooltip" + id}
      placement={"bottom"}
      overlay={
        <Tooltip id={`tooltip-${id}`}>
          {filtros.map(filtro => (
            <span>
            {filtro}
              <br/>
          </span>
          ))}
        </Tooltip>
      }
    >
      <Button variant="secondary">{filtros.length} </Button>
    </OverlayTrigger>
  );
}

export default TablaEventos;
