import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import CardFiltros from '../../Cards/CardFiltro/CardFiltro.tsx'
import Modal from '../../Modales/Modal/Modal.tsx'
import './Filtros.scss'
import {Dispatch, SetStateAction, useState, useContext} from "react"
import Boton from "../../Inputs/Boton";
import FormularioFiltro from "../../Formularios/FormularioFiltro/FormularioFiltro.tsx";
import Filtro from "../../../models/Filtro.ts";
import {useAgregaFiltro, useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";
import {ValidationError} from "yup";
import { AgendaContext } from "../../../providers/AgendaProvider.tsx";
import { PermisosEnum } from "../../../enums/PermisosEnum.ts";

function Filtros() {
  const [nuevoFiltro, setNuevoFiltro] = useState(new Filtro())
  const [errores, setErrores] = useState({})
  const usuarios = useContext(AgendaContext).data.usuario;


  const {filtros} = useObtenFiltros()
  const {
    agregaFiltro,
    registroExitoso,
    reset
  } = useAgregaFiltro(setErrores)
  const onFiltroChange = useModelChange(setNuevoFiltro as Dispatch<SetStateAction<Object>>)

  return (
    <div className="cards-filtros py-4 container">
      {usuarios?.permisos?.includes(PermisosEnum.MODIFICAR_USUARIO) ? modalNuevoFiltro() : undefined}
    
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
        timeout={registroExitoso ? 2000 : undefined}
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
