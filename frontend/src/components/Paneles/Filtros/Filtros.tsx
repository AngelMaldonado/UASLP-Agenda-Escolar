import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import CardFiltros from '../../Cards/CardFiltro/CardFiltro.tsx'
import Modal from '../../Modales/Modal/Modal.tsx'
import './Filtros.scss'
import {useState} from "react"
import Boton from "../../Inputs/Boton";
import FormularioFiltro from "../../Formularios/FormularioFiltro/FormularioFiltro.tsx";
import Filtro from "../../../models/Filtro.ts";
import {useAgregaFiltro, useObtenFiltros} from "../../../hooks/HooksFiltro.ts";

function Filtros() {
  const [nuevoFiltro, setNuevoFiltro] = useState(new Filtro())
  const [mostrarModal, setMostrarModal] = useState(false)

  const {filtros} = useObtenFiltros()
  const {agregaSimbolo} = useAgregaFiltro()

  const cambiaFiltro = {
    onSingleChange: ((field: string, value: string | File) => setNuevoFiltro(prevState => ({
      ...prevState, [field]: value
    }))),
  }

  return (
    <div className="cards-filtros py-4 container">
      <Modal
        mostrar={mostrarModal}
        muestraModal={muestraModal}
        ocultaModal={ocultaModal}
        trigger={CardFiltros.CardNuevoFiltro}
        titulo={<div><FaRegUser/><p className="fs-5">Filtro nuevo</p></div>}
        contenido={<FormularioFiltro filtro={nuevoFiltro} {...cambiaFiltro}/>}
        botones={[
          <Boton key={"boton-cancelar"}
                 variant={TemaComponente.DangerInverso}
                 etiqueta="Cancelar"
                 icono={<FaTimes/>}
                 onClick={ocultaModal}/>,
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={() => {
                   if (FormularioFiltro.valida()) {
                     agregaSimbolo(nuevoFiltro)
                     ocultaModal()
                   }
                 }}
          />
        ]}
      />
      {filtros?.map(filtro => {
        return <CardFiltros key={"filtro-" + filtro.id} filtro={filtro}/>
      })}
    </div>
  );

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setNuevoFiltro(new Filtro())
    setMostrarModal(false)
  }
}

export default Filtros;
