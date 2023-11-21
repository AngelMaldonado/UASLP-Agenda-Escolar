import Table from 'react-bootstrap/Table';
import { TemaComponente } from '../../utils/Utils';
import Boton from '../Boton';
import Evento from "../../models/Evento.ts";
import Modal from '../Modal/index.ts';
import { useState } from 'react';
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaTimes, FaTrash} from "react-icons/fa";
import {FcCancel} from "react-icons/fc";
import FormularioEvento from '../FormularioEvento/FormularioEvento.tsx';
import './TablaEventos.scss'
import { CampoDesplegable } from '../Campo/Campo.tsx';
import Areas, {AreasOption} from "../../models/Areas.ts";
import Comunidades, {ComunidadesOption} from "../../models/Comunidades.ts";
import React from 'react';

import eventos from '../../models/Eventos.ts';



type Eventos  =  {
  eventos: Evento[];
}


function TablaEventos(props: Eventos ) {
  const [eventoTabla, setEvento] = useState(props.eventos)
  const [muestraModalModifEvento, setMostrarModalModificar] = useState(false)
  const [muestraModalEliminarEvento, setMostrarModalEliminar] = useState(false)

  const cambiaEvento = {
    onSingleChange: (index: number, field: string, value: string | Date | number) => {
      setEvento(prevState => {
        const nuevosEventos = [...prevState];
        nuevosEventos[index] = { ...nuevosEventos[index], [field]: value };
        return nuevosEventos;
      });
    },
    // Otras funciones si es necesario
  };

  return (

    <div className='border border-dark container'>
      <Table responsive="sm">
        <thead className='text-center tableHead'>
            <tr>
              <th>#</th>
              {/* {Array.from({ length: 9 }).map((_, index) => (
                  <th key={index}>Table heading</th>
              ))} */}
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
        <tbody className=' tablaEvento text-center '>
            
            {props.eventos.map((events) => (
            <tr className=''>
              <td>{events.cat_evento_id}</td>
              <td>{events.nombre}</td>
              <td ><div className=' d-flex justify-content-center  '><img src={events.simbolo} alt=""  className='img-fluid'/>
                </div></td>
              <td>{Intl.DateTimeFormat('es-MX').format(events?.fecha_inicio).toUpperCase()}</td>
              <td>{Intl.DateTimeFormat('es-MX').format(events?.fecha_fin).toUpperCase()}</td>
              <td>   
              {obtenComunidades({ comunidades: events.comunidades })}
              </td>
              <td>{events.areas}</td>
              <td>{events.descripcion}</td>
              <td>
                <div className='vh-50 d-flex justify-content-center '><img src='https://picsum.photos/200/300'/*src={events.imagen}*/ alt="" className='img-fluid ' />
                </div>
              </td>
              <td>{events.hipervinculos}</td>
              <td>
                <div className='d-flex-column'> 
                  {botonEliminar(events.nombre)}
                  {botonEdicion()}
                </div>  
              </td>
            </tr>  
          ))}
        </tbody>
      </Table>
    </div>
  );

  function botonEdicion() {
    return (
      <Modal
        titulo={<div><FaRegCalendarAlt/><p className="fs-5">Modificar Evento</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
        contenido={<FormularioEvento evento={eventoTabla} {...cambiaEvento}/>}
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
  }
  
  function botonEliminar(props: string) {
    return (
      <Modal
        titulo={<div><FaRegCalendarAlt/><p className="fs-5">Eliminar Evento</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
        contenido={<p className="fs-5 text-center">¿Esta seguro que desea eliminar el
          usuario <strong> [{props}]</strong>?</p>}
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
  }

  function obtenComunidades(props: Props): React.ReactNode {
    const { comunidades } = props;
  
    return (
      <>
        {comunidades.map(comunidad => {
          const opcionEncontrada = Comunidades.find(opcion => opcion.value === comunidad);
  
          if (opcionEncontrada) {
            return <p key={opcionEncontrada.value}>{opcionEncontrada.label}</p>;
          } else {
            return null; // Puedes manejar este caso como desees
          }
        })}
      </>
    );
  }

 
  function muestraModalModificar() {
    setMostrarModalModificar(true)
  }

  function ocultaModalModificar() {
    setMostrarModalModificar(false)
  }

  function muestraModalEliminar() {
    setMostrarModalEliminar(true)
  }

  function ocultaModalEliminar() {
    setMostrarModalEliminar(false)
  }
}


export default TablaEventos;