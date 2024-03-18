import './_card-calendario.scss'
import Evento from "../../../models/Evento.ts";
import Boton from "../../Inputs/Boton";
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import Modal from "../../Modales/Modal";
import FormularioEvento from "../../Formularios/FormularioEvento";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {useEliminaEvento, useModificaEvento} from "../../../hooks/HooksEvento.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {ChipsEvento} from "../../Chips/ChipsEvento/ChipsEvento.tsx";
import {PublicContext} from "../../../providers/AgendaProvider.tsx";
import {Button} from "react-bootstrap";

type CardCalendarioProps = {
  evento: Evento
  admin?: boolean
}

function CardCalendario(props: CardCalendarioProps) {
  const [evento, setEvento] = useState(props.evento)
  const [errores, setErrores] = useState({})
  const [eliminando, setEliminando] = useState(false)

  const {modificaEvento, modificacionExitosa, reset} = useModificaEvento(setErrores)
  const {eliminaEvento, eliminacionExitosa} = useEliminaEvento(setErrores)
  const cambiaEvento = useModelChange(setEvento as Dispatch<SetStateAction<Object>>)
  const setData = useContext(PublicContext).setData

  return (
    <div className="card card-evento" onClick={() =>
      setData(prevState => ({...prevState, eventoActual: props.evento}))
    }>
      <div className="simbologia flex-grow-0">
        <div className="circle rounded-circle"
             style={{backgroundImage: `url(${Configuraciones.publicURL + evento.simbolo})`}}>
          5-6
        </div>
      </div>
      <div className="titulo-evento flex-grow-1">
        {props.evento.nombre}
      </div>
      {props.admin ? (
        <div className="d-flex flex-column gap-1 me-3">
          {modalEvento()}
        </div>
      ) : null}
      <ChipsEvento filtros_evento={props.evento.filtros}/>
    </div>
  );

  function modalEvento() {
    return (
      <Modal
        sinFondo={eliminando || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa}
        timeout={modificacionExitosa ? 2000 : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegCalendarAlt/> <p className="fs-5">Modificar Evento</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
      />
    )
  }

  function triggers() {
    return ([
      <Button variant="primary-inverse"
              className="rounded-circle"
              onClick={(e) => {
                setEliminando(false)
              }}
      >
        <FaRegEdit/>
      </Button>,
      <Boton key={"eliminar-evento-" + props.evento.id}
             rounded
             variant={TemaComponente.DangerInverso}
             icono={<FaRegTrashAlt/>}
             onClick={() => setEliminando(true)}
      />
    ])
  }

  function contenidoModal() {
    if (modificacionExitosa) {
      return <p>El evento se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p>El evento se eliminó correctamente</p>
    } else if (eliminando) {
      return <p className="fs-5 text-center">
        ¿Esta seguro que desea eliminar el
        evento <strong> [{props.evento.nombre}] </strong> ?
      </p>
    } else return <FormularioEvento evento={evento} setEvento={cambiaEvento} errores={errores}/>
  }

  function botonesModal() {
    return [
      <Boton key={"boton-eliminar"}
             variant={TemaComponente.PrimarioInverso}
             etiqueta="Eliminar"
             icono={<FaRegTrashAlt/>}
             onClick={() => eliminando ? eliminaEvento(evento) : setEliminando(true)}
      />,
      !eliminando ?
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               etiqueta="Guardar"
               icono={<FaRegPlusSquare/>}
               onClick={modificaEventoExistente}
        /> : <></>
    ]
  }

  function modificaEventoExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Evento.schema.validate(evento)
      // Si se validó correctamente, enviar a back
      .then(_ => {
        modificaEvento(
          Object.fromEntries(Object.entries(evento).filter(([_, v]) => v !== null)) as Evento
        )
      })
      // Si no coincide con el esquema, mostrar errores
      .catch(r => console.log(r))
  }

  function onClose() {
    reset()
    setEvento(props.evento)
    setErrores({})
    setEliminando(false)
  }
}

export default CardCalendario;
