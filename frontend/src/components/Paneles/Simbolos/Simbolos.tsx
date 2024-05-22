import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Tipos.ts";
import Modal from '../../Modales/Modal/Modal.tsx'
import './_simbolos.scss'
import {Dispatch, SetStateAction, useState} from "react"
import Boton from "../../Inputs/Boton";
import Simbologia from "../../../models/Simbologia.ts";
import CardSimbolo from "../../Cards/CardSimbolo";
import {useAgregaSimbolo, useObtenSimbolos} from "../../../hooks/HooksSimbolo.ts";
import FormularioSimbolo from "../../Formularios/FormularioSimbolo";
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {ValidationError} from "yup";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";

function Simbolos() {
  const [nuevoSimbolo, setNuevoSimbolo] = useState(new Simbologia())
  const [errores, setErrores] = useState({})

  const {simbolos} = useObtenSimbolos()
  const {agregaSimbolo, registroExitoso, reset} = useAgregaSimbolo(setErrores)

  const onSimboloChange = useObjectAttributeChange(setNuevoSimbolo as Dispatch<SetStateAction<Object>>)

  const usuario = useObtenSesion().sesion?.usuario;

  return (
    <div className="cards-filtros py-4 container">
      {usuario?.permisos?.includes(PermisosEnum.CREAR_SIMBOLO) ? modalNuevoSimbolo() : undefined}
      {simbolos?.map(simbolo => {
        return <CardSimbolo key={"simbolo-" + simbolo.id} simbologia={simbolo}/>
      })}
    </div>
  );

  function modalNuevoSimbolo() {
    return (
      <Modal
        onClose={onClose}
        trigger={CardSimbolo.CardNuevoSimbolo}
        titulo={<div><FaRegUser/><p className="fs-5">Símbolo nuevo</p></div>}
        contenido={contenidoModal()}
        timeout={registroExitoso ? 2000 : undefined}
        sinFondo={registroExitoso}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={agregaNuevoSimbolo}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso)
      return (<p>El símbolo se agregó con éxito</p>)
    else
      return (<FormularioSimbolo simbologia={nuevoSimbolo} setSimbolo={onSimboloChange} errores={errores}/>)
  }

  function agregaNuevoSimbolo() {
    // Valida el nuevoFiltro antes de enviar a back
    Simbologia.schema.validate(nuevoSimbolo)
      // Si se validó correctamente, enviar a back
      .then(_ => agregaSimbolo(nuevoSimbolo))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => {
        setErrores({[r.path!]: r.errors})
        setTimeout(() => setErrores({}), 5000)
      })
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoSimbolo(new Simbologia())
  }
}

export default Simbolos;
