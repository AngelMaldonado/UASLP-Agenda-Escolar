import './_card-calendario.scss'
import Evento from "../../../models/Evento.ts";
import Boton from "../../Inputs/Boton";
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaTimes, FaTrash} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import Modal from "../../Modales/Modal";
import FormularioEvento from "../../Formularios/FormularioEvento";
import {useState} from "react";
import {FcCancel} from "react-icons/fc";
import {useEliminaEvento, useModificaEvento} from "../../../hooks/HooksEvento.ts";

type CardCalendarioProps = {
  evento: Evento
  admin?: boolean
}

function CardCalendario(props: CardCalendarioProps) {
  const [evento, setEvento] = useState(props.evento)
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false)
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

  const {modificaEvento} = useModificaEvento()
  const {eliminaEvento} = useEliminaEvento()

  const cambiaEvento = {
    onSingleChange: ((field: string, value: string | Date | number | null) => setEvento(prevState => ({
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
    <div className="card card-evento">
      <div className="flex-grow-0">
        <div className="circle bg-info-subtle rounded-circle overflow-hidden">
          <img src={props.evento.simbolo} alt={"Simbologia " + props.evento.nombre}/>
          <small>
            {/*{Intl.DateTimeFormat('es-MX', {month: 'short'}).format(props.evento.fecha_inicio.getMonth()).toUpperCase()}*/}
          </small>
          5-6
        </div>
      </div>
      <div className="w-100 me-2 titulo-evento">
        {props.evento.nombre}
      </div>
      {props.admin ? (
        <div className="d-flex flex-column gap-1 me-2">
          {botonEdicion()}
          {botonEliminar()}
        </div>
      ) : null}
      <div className="pills">
        <span>Estudiantes</span>
        <span>Ingenieria</span>
      </div>
    </div>
  );

  function botonEdicion() {
    return (
      <Modal
        titulo={<div><FaRegCalendarAlt/><p className="fs-5">Modificar Evento</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
        contenido={<FormularioEvento evento={evento} {...cambiaEvento}/>}
        mostrar={mostrarModalModificar}
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
                     modificaEvento(evento)
                     ocultaModalModificar()
                   }
                 }}
          />
        ]}
      />
    )
  }

  function botonEliminar() {
    return (
      <Modal
        titulo={<div><FaRegCalendarAlt/><p className="fs-5">Eliminar Evento</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
        contenido={<p className="fs-5 text-center">¿Esta seguro que desea eliminar el
          usuario <strong> [{evento.nombre}]</strong>?</p>}
        mostrar={mostrarModalEliminar}
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
                   eliminaEvento(evento)
                   ocultaModalEliminar()
                 }}
          />
        ]}
      />
    )
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

export default CardCalendario;
