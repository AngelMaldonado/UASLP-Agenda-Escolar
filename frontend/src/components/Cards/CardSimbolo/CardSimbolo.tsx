import Card from 'react-bootstrap/Card';
import Boton from "../../Inputs/Boton";
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser} from "react-icons/fa";
import './_card-simbolo.scss';
import {TemaComponente} from '../../../utils/Utils.ts';
import Simbologia from "../../../models/Simbologia.ts";
import Modal from "../../Modales/Modal";
import FormularioSimbolo from "../../Formularios/FormularioSimbolo";
import {Dispatch, SetStateAction, useState, useContext} from "react";
import {useEliminaSimbolo, useModificaSimbolo} from "../../../hooks/HooksSimbolo.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";
import { AgendaContext } from "../../../providers/AgendaProvider.tsx";
import { PermisosEnum } from "../../../enums/PermisosEnum.ts";

type CardSimboloProps = {
  simbologia: Simbologia
}

function CardSimbolo(props: CardSimboloProps) {
  const [simbologia, setSimbologia] = useState(props.simbologia)
  const [errores, setErrores] = useState({})
  const [eliminando, setEliminando] = useState(false)
  const usuarios = useContext(AgendaContext).data.usuario;


  const {
    modificaSimbolo,
    modificacionExitosa,
    reset
  } = useModificaSimbolo(setErrores)
  const {eliminaSimbolo, eliminacionExitosa} = useEliminaSimbolo(setErrores)

  const cambiaSimbolo = useModelChange(setSimbologia as Dispatch<SetStateAction<Object>>)

  return (
    <Card className="CardSimbolo">
      <Card.Body>
        <Card.Title>
          {modalSimbolo()}
        </Card.Title>
      </Card.Body>
      <Card.Img variant="bottom"
                src={Configuraciones.publicURL + simbologia.simbolo}
                alt={`Imagen simbología ${simbologia.id}`}/>
    </Card>
  );

  function modalSimbolo() {
    return (
      <Modal
        sinFondo={eliminando || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa}
        timeout={modificacionExitosa ? 2000 : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegUser/> <p className="fs-5">Modificar Simbolo</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
      />
    )
  }

  function triggers() {
    const tienePermisoModificar = usuarios?.permisos?.includes(PermisosEnum.MODIFICAR_SIMBOLO);
    const tienePermisoEliminar = usuarios?.permisos?.includes(PermisosEnum.ELIMINAR_SIMBOLO);

    return ([
      tienePermisoModificar && (
        <Boton key={"boton-modificar-simbolo-" + props.simbologia.id}
              rounded
              variant={TemaComponente.PrimarioInverso}
              icono={<FaRegEdit/>}
              onClick={() => setEliminando(false)}
        />
      ),
      tienePermisoEliminar && (
        <Boton key={"eliminar-simbolo-" + props.simbologia.id}
              rounded
              variant={TemaComponente.DangerInverso}
              icono={<FaRegTrashAlt/>}
              onClick={() => setEliminando(true)}
        />
      )
    ])
  }

  function contenidoModal() {
    if (modificacionExitosa) {
      return <p key="texto-modificacion"  className="text-center">El símbolo se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p key="texto-eliminacion"  className="text-center">El símbolo se eliminó correctamente</p>
    } else if (eliminando) {
      return <p className="fs-5 text-center" key="texto-eliminando">
        ¿Esta seguro que desea eliminar el símbolo?
      </p>
    } else return <FormularioSimbolo key="formulario-modificacion"
                                     simbologia={simbologia}
                                     setSimbolo={cambiaSimbolo}
                                     errores={errores}/>
  }

  function botonesModal() {
    return [
      <Boton key={"boton-eliminar"}
             variant={TemaComponente.PrimarioInverso}
             etiqueta="Eliminar"
             icono={<FaRegTrashAlt/>}
             onClick={() => eliminando ? eliminaSimbolo(simbologia) : setEliminando(true)}
      />,
      !eliminando ?
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               etiqueta="Guardar"
               icono={<FaRegPlusSquare/>}
               onClick={modificaSimboloExistente}
        /> : <></>
    ]
  }

  function modificaSimboloExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Simbologia.schema.validate(simbologia)
      // Si se validó correctamente, enviar a back
      .then(_ => modificaSimbolo(simbologia))
      // Si no coincide con el esquema, mostrar errores
      .catch(r => console.log(r))
  }

  function onClose() {
    reset()
    setSimbologia(props.simbologia)
    setErrores({})
    setEliminando(false)
  }
}

CardSimbolo.CardNuevoSimbolo = (
  <div className="card-simbolo-nuevo text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus/>
      </div>
      <br/>
      <h3 className="card-title">Nuevo Símbolo</h3>
    </div>
  </div>
)

export default CardSimbolo;
