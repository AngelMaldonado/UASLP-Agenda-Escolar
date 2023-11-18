import Table from 'react-bootstrap/Table';
import { TemaComponente } from '../../utils/Utils';
import Boton from '../Boton';
import {FaRegEdit , FaTrash} from "react-icons/fa"
import Evento from "../../models/Evento.ts";
import { useState } from 'react';


type Eventos = {
  eventos: Evento;
}


function TablaEventos(props: Eventos ) {
  const [evento, setEvento] = useState(props.evento)
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false)
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

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

    <div>
      <Table responsive="sm">
        <thead>
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
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>ffsdf</td>
                <td>
                  <div className='d-flex'>
                    <Boton key={"boton-eliminar"}
                            variant={TemaComponente.DangerInverso}
                            icono={<FaTrash/>}
                    />
                    <Boton key={"boton-guardar"}
                            variant={TemaComponente.SuccessInverso}
                            icono={<FaRegEdit/>}
                    />
                  </div>
                </td>
        
            </tr>  
            <tr>
            <td>2</td>
            {Array.from({ length: 9}).map((_, index) => (
                <td key={index}>Table cell {index}</td>
            ))}
            </tr>
            <tr>
            <td>3</td>
            {Array.from({ length: 9 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
            ))}
            </tr>
        </tbody>
      </Table>
    </div>
  );
  
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