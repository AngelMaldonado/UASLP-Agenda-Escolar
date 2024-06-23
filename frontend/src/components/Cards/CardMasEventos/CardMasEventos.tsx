import "./_cardmaseventos.scss";
import Evento from "../../../models/Evento.ts";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Tipos.ts";
import {AiOutlineExport} from "react-icons/ai";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import { useContext } from "react";
import {useEliminaEvento, useModificaEvento} from "../../../hooks/HooksEvento.ts";
import { Dispatch, SetStateAction, useState } from "react";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {FaRegTrashAlt} from "react-icons/fa";
import Modal from "../../Modales/Modal/index.ts";
import FormularioEvento from "../../Formularios/FormularioEvento/FormularioEvento.tsx";
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {Spinner} from "react-bootstrap";
import { Configuraciones } from "../../../utils/Constantes.ts";

function CardMasEventos(props: { evento: Evento }) {
  const [evento, setEvento] = useState(props.evento)
  const {setData} = useContext(AgendaContext)
  const [errores, setErrores] = useState({});
  const usuario = useObtenSesion().sesion?.usuario;
  const [eliminandoSt, setEliminandoSt] = useState(false);

  const {eliminaEvento, eliminacionExitosa, eliminando} = useEliminaEvento(setErrores);
  const cambiaEvento = useObjectAttributeChange(setEvento as Dispatch<SetStateAction<Object>>);
  const { reset} = useModificaEvento(setErrores);


  return (
    <div className="cardMasEventos" >
      <div className="content">
        <img
          src={Configuraciones.publicURL + props.evento.imagen}
          alt={"Símbolo " + props.evento.nombre}
        />
        <div className="title">{evento.nombre}</div>
        <div className="fecha">
          {Intl.DateTimeFormat("es-MX").format(evento.fecha_inicio)}
        </div>
        <div className="verMas">
          <Boton
            etiqueta="Ver evento"
            icono={<AiOutlineExport/>}
            variant={TemaComponente.PrimarioInverso}
            onClick={() => setData(prevState => ({...prevState, eventoActual: props.evento}))}
          
          />
        </div>
        <div className="bottons">
           {modalEliminaEvento()}
        </div>
      </div>
    </div>
  );

  function modalEliminaEvento() {
    return (
    <Modal
    sinFondo={eliminandoSt || eliminacionExitosa}
    cancelar={!eliminacionExitosa && !eliminando}
    timeout={undefined}
    triggers={triggers()}
    onClose={onClose}
    titulo={<div> <p className="fs-5"></p></div>}
    contenido={contenidoModal()}
    botones={eliminacionExitosa ? [] : botonesModal()}
  />
    )
  }

  function triggers(): React.ReactElement[] {
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_EVENTO);
    return ([
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
    if (eliminacionExitosa) {
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

    return [
      tienePermisoEliminar && (
      <Boton key={"boton-eliminar"}
             variant={TemaComponente.PrimarioInverso}
             icono={eliminando ?
               <Spinner animation="border" role="status" size="sm">
                 <span className="visually-hidden">Loading...</span>
               </Spinner>
               : <FaRegTrashAlt/>
             }
             disabled={eliminando}
             etiqueta={!eliminando ? "Eliminar" : "Eliminando..."}
             onClick={() => eliminandoSt ? eliminaEvento(evento) : setEliminandoSt(true)}
      />),
       <></>
    ]
  }

  function onClose() {
    reset()
    setEvento(props.evento)
    setErrores({})
    setEliminandoSt(false)
  }

}


export default CardMasEventos;
