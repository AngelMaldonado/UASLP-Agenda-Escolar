import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import CardFiltros from '../../Cards/CardFiltro/CardFiltro.tsx'
import Modal from '../../Modales/Modal/Modal.tsx'
import './Filtros.scss'
import {useState} from "react"
import Boton from "../../Inputs/Boton";


function Filtros() {
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <div className="cards-filtros py-4 container">
      <Modal
        mostrar={mostrarModal}
        muestraModal={muestraModal}
        ocultaModal={ocultaModal}
        trigger={CardFiltros.CardNuevoFiltro}
        titulo={<div><FaRegUser/><p className="fs-5">Filtro nuevo</p></div>}
        contenido={<></>}
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

                   ocultaModal()

                 }}
          />
        ]}
      />
      <CardFiltros/>
      {/* {modalRespuesta()}
                {filtros?.map(filtro => {
                    return <CardFiltro key={"filtro-" + filtro.id} filtro={filtro}/>
            })} */}
    </div>


  );


  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setMostrarModal(false)
  }
}

export default Filtros;
