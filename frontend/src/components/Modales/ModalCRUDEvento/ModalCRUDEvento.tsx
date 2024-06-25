import Evento from '../../../models/Evento.ts';
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Tipos.ts";
import FormularioEvento from "../../Formularios/FormularioEvento";
import Modal from '../../Modales/Modal/index.ts';
import {FaRegCalendarAlt, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt} from "react-icons/fa";
import {Button, Spinner} from "react-bootstrap";
import {Dispatch, SetStateAction, useState} from "react";
import {useEliminaEvento, useModificaEvento} from "../../../hooks/HooksEvento.ts";
import useObjectAttributeChange, {useObjectChangeTimeout} from "../../../hooks/HookObjectChange.ts";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {modalTimeout} from "../../../utils/Constantes.ts";
import {ValidationError} from "yup";

export default function ModalCRUDEvento(props: { evento: Evento }) {
  const [evento, setEvento] = useState(props.evento)
  const [errores, setErrores] = useState({});
  const [eliminandoSt, setEliminandoSt] = useState(false);
  const usuario = useObtenSesion().sesion?.usuario;
  const onValidationError = useObjectChangeTimeout(setErrores)

  const {modificaEvento, modificacionExitosa, modificando, reset} = useModificaEvento(setErrores);
  const {eliminaEvento, eliminacionExitosa, eliminando} = useEliminaEvento(setErrores);
  const cambiaEvento = useObjectAttributeChange(setEvento as Dispatch<SetStateAction<object>>);

  return (
    <Modal
      sinFondo={eliminandoSt || eliminacionExitosa || modificacionExitosa}
      cancelar={!modificacionExitosa && !eliminacionExitosa && !modificando && !eliminando}
      timeout={modificacionExitosa ? modalTimeout : undefined}
      triggers={triggers()}
      onClose={onClose}
      titulo={<div><FaRegCalendarAlt/> <p className="fs-5">Modificar Evento</p></div>}
      contenido={contenidoModal()}
      botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
    />
  )

  function triggers(): React.ReactElement[] {
    const tienePermisoModificar = usuario?.permisos?.includes(PermisosEnum.MODIFICAR_EVENTO);
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_EVENTO);
    return ([
      tienePermisoModificar && (
        <Button variant="primary-inverse" className="rounded-circle" onClick={() => setEliminandoSt(false)}>
          <FaRegEdit/>
        </Button>
      ),
      tienePermisoEliminar && (
        <Boton key={"eliminar-evento-" + props.evento.id}
               rounded
               variant={TemaComponente.DangerInverso}
               icono={<FaRegTrashAlt/>}
               onClick={() => setEliminandoSt(true)}
        />
      )
    ] as React.ReactElement[])
  }

  function contenidoModal() {
    if (modificacionExitosa) {
      return <p className="text-center">El evento se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p className="text-center">El evento se eliminó correctamente</p>
    } else if (eliminandoSt) {
      return <p className="fs-5 text-center">
        ¿Esta seguro que desea eliminar el
        evento <strong> [{props.evento.nombre}] </strong> ?
      </p>
    } else return <FormularioEvento evento={evento} setEvento={cambiaEvento} errores={errores}/>
  }

  function botonesModal() {
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_EVENTO);
    const botones = []
    if (tienePermisoEliminar)
      botones.push(
        <Boton key={"boton-eliminar"}
               variant={TemaComponente.PrimarioInverso}
               icono={eliminando ?
                 <Spinner animation="border" role="status" size="sm">
                   <span className="visually-hidden">Loading...</span>
                 </Spinner>
                 : <FaRegTrashAlt/>
               }
               disabled={modificando || eliminando}
               etiqueta={!eliminando ? "Eliminar" : "Eliminando..."}
               onClick={() => eliminandoSt ? eliminaEvento(evento) : setEliminandoSt(true)}
        />
      )

    if (!eliminandoSt)
      botones.push(
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               icono={modificando ?
                 <Spinner animation="border" role="status" size="sm">
                   <span className="visually-hidden">Loading...</span>
                 </Spinner>
                 : <FaRegPlusSquare/>
               }
               disabled={modificando || eliminando}
               etiqueta={!modificando ? "Guardar" : "Guardando..."}
               onClick={modificaEventoExistente}
        />
      )

    return botones
  }

  function modificaEventoExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Evento.schema.validate(evento)
      // Si se validó correctamente, enviar a back
      .then(() => {
        modificaEvento(
          Object.fromEntries(Object.entries(evento).filter(([_, v]) => v !== null)) as Evento
        )
      })
      // Si no coincide con el esquema, mostrar errores
      .catch((r: ValidationError) => onValidationError({[r.path!]: r.errors}))
  }

  function onClose() {
    reset()
    setEvento(props.evento)
    setErrores({})
    setEliminandoSt(false)
  }
}
