import Card from 'react-bootstrap/Card';
import Boton from "../../Inputs/Boton";
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser} from "react-icons/fa";
import './_card-simbolo.scss';
import {TemaComponente} from '../../../utils/Tipos.ts';
import Simbologia from "../../../models/Simbologia.ts";
import Modal from "../../Modales/Modal";
import FormularioSimbolo from "../../Formularios/FormularioSimbolo";
import {Dispatch, SetStateAction, useState} from "react";
import {useEliminaSimbolo, useModificaSimbolo} from "../../../hooks/HooksSimbolo.ts";
import {Configuraciones, modalTimeout} from "../../../utils/Constantes.ts";
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {Spinner} from "react-bootstrap";

type CardSimboloProps = {
  simbologia: Simbologia
}

function CardSimbolo(props: CardSimboloProps) {
  const [simbologia, setSimbologia] = useState(props.simbologia)
  const [errores, setErrores] = useState({})
  const [eliminandoSt, setEliminandoSt] = useState(false)
  const usuario = useObtenSesion().sesion?.usuario;

  const {modificaSimbolo, modificacionExitosa, modificando, reset} = useModificaSimbolo(setErrores)
  const {eliminaSimbolo, eliminacionExitosa, eliminando} = useEliminaSimbolo(setErrores)

  const cambiaSimbolo = useObjectAttributeChange(setSimbologia as Dispatch<SetStateAction<Object>>)

  return (
    <Card className="CardSimbolo">
      <Card.Body>
        <Card.Title>
          {modalSimbolo()}
        </Card.Title>
      </Card.Body>
      <Card.Img  variant="bottom"
                src={Configuraciones.publicURL + simbologia.simbolo}
                alt={`Imagen simbología ${simbologia.id}`}/>
    </Card>
  );

  function modalSimbolo() {
    return (
      <Modal
        sinFondo={eliminandoSt || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa && !eliminacionExitosa && !modificando && !eliminando}
        timeout={modificacionExitosa ? modalTimeout : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegUser/> <p className="fs-5">Modificar Simbolo</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
      />
    )
  }

  function triggers(): React.ReactElement[] {
    const tienePermisoModificar = usuario?.permisos?.includes(PermisosEnum.MODIFICAR_SIMBOLO);
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_SIMBOLO);

    return ([
      tienePermisoModificar && (
        <Boton key={"boton-modificar-simbolo-" + props.simbologia.id}
               rounded
               variant={TemaComponente.PrimarioInverso}
               icono={<FaRegEdit/>}
               onClick={() => setEliminandoSt(false)}
        />
      ),
      tienePermisoEliminar && (
        <Boton key={"eliminar-simbolo-" + props.simbologia.id}
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
      return <p key="texto-modificacion" className="text-center">El símbolo se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p key="texto-eliminacion" className="text-center">El símbolo se eliminó correctamente</p>
    } else if (eliminandoSt) {
      return <p className="fs-5 text-center" key="texto-eliminando">
        ¿Esta seguro que desea eliminar el símbolo?
      </p>
    } else return <FormularioSimbolo key="formulario-modificacion"
                                     simbologia={simbologia}
                                     setSimbolo={cambiaSimbolo}
                                     errores={errores}/>
  }

  function botonesModal() {
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_SIMBOLO);

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
             disabled={modificando || eliminando}
             etiqueta={!eliminando ? "Eliminar" : "Eliminando..."}
             onClick={() => eliminandoSt ? eliminaSimbolo(simbologia) : setEliminandoSt(true)}
      />),
      !eliminandoSt ?
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
    setEliminandoSt(false)
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
