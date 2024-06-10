import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Tipos.ts";
import CardFiltros from '../../Cards/CardFiltro/CardFiltro.tsx'
import Modal from '../../Modales/Modal/Modal.tsx'
import './Filtros.scss'
import {Dispatch, SetStateAction, useState} from "react"
import Boton from "../../Inputs/Boton";
import FormularioFiltro from "../../Formularios/FormularioFiltro/FormularioFiltro.tsx";
import Filtro from "../../../models/Filtro.ts";
import {useAgregaFiltro, useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {ValidationError} from "yup";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";
import {modalTimeout} from "../../../utils/Constantes.ts";

function Filtros() {
  const [nuevoFiltro, setNuevoFiltro] = useState(new Filtro())
  const [errores, setErrores] = useState({})
  const usuario = useObtenSesion().sesion?.usuario;

  const {filtros} = useObtenFiltros()
  const {
    agregaFiltro,
    registroExitoso,
    reset
  } = useAgregaFiltro(setErrores)
  const onFiltroChange = useObjectAttributeChange(setNuevoFiltro as Dispatch<SetStateAction<Object>>)

  return (
    <div className="cards-filtros py-4 container">
      {usuario?.permisos?.includes(PermisosEnum.MODIFICAR_USUARIO) ? modalNuevoFiltro() : undefined}

      {filtros?.map(filtro => {
        return <CardFiltros key={"filtro-" + filtro.id} filtro={filtro}/>
      })}
    </div>
  );

  function modalNuevoFiltro() {
    return (
      <Modal
        onClose={onClose}
        trigger={CardFiltros.CardNuevoFiltro}
        titulo={<div><FaRegUser/><p className="fs-5">Filtro nuevo</p></div>}
        contenido={contenidoModal()}
        timeout={registroExitoso ? modalTimeout : undefined}
        sinFondo={registroExitoso}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={agregaNuevoFiltro}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso)
      return (<p>El filtro se agregó con éxito</p>)
    else
      return (<FormularioFiltro filtro={nuevoFiltro} setFiltro={onFiltroChange} errores={errores}/>)
  }

  function agregaNuevoFiltro() {
    // Valida el nuevoFiltro antes de enviar a back
    Filtro.schema.validate(nuevoFiltro)
      // Si se validó correctamente, enviar a back
      .then(_ => agregaFiltro(nuevoFiltro))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => {
        setErrores({[r.path!]: r.errors})
        setTimeout(() => setErrores({}), 5000)
      })
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoFiltro(new Filtro())
  }
}

export default Filtros;
