
import Evento from '../../../models/Evento.ts';
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";
import FormularioEvento from "../../Formularios/FormularioEvento";
import Modal from '../../Modales/Modal/index.ts';
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {Dispatch, SetStateAction, useState} from "react";
import {useEliminaEvento, useModificaEvento} from "../../../hooks/HooksEvento.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";



export function modalEvento(props: { evento: Evento }) {
  const [evento, setEvento] = useState(props.evento)
  const [errores, setErrores] = useState({});
  const [eliminando, setEliminando] = useState(false);

  const {modificaEvento, modificacionExitosa, reset} = useModificaEvento(setErrores);
  const {eliminaEvento, eliminacionExitosa} = useEliminaEvento(setErrores);
  const cambiaEvento = useModelChange(setEvento as Dispatch<SetStateAction<Object>>);

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