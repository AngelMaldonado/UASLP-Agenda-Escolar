import './CardFiltro.scss'
//////////////////////////////////////////////////////////
import Boton from "../Boton"
import Modal from "../Modal";
import {useState} from "react";
import {FcCancel} from "react-icons/fc"
import Filtros from '../../models/Filtros.ts'
import {TemaComponente} from "../../utils/Utils.ts"
import {ModificaUsuario} from "../FormularioUsuario";
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser, FaTimes, FaTrash} from "react-icons/fa"

//import {useModificaUsuario, useEliminaUsuario} from "../../hooks/HooksUsuario.ts";
///////////////////////////////////////////////////////////////////////////////////////////////////


function CardFiltro(/*props: { filtro: Filtros}*/) {
  const [mostrarModalFiltro, setMostrarModalFiltro] = useState(false)
  const [mostrarModalFiltroElimr, setMostrarModalFiltroElimr] = useState(false)


  return (
    <div className='CardFiltro'>
      <div className='card-header d-flex justify-content-evenly align-items-center bg-transparent border-0'>
        <div className='d-inline-flex'>
          <Modal
              mostrar={mostrarModalFiltro}
              muestraModal={muestraModal}
              ocultaModal={ocultaModal}
              titulo={<div><FaRegUser/> <p className="fs-5">Modificar Usuario</p></div>}
              trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
              contenido={<></>}
              botones={[
          
                <Boton key={"boton-eliminar"}
                      variant={TemaComponente.DangerInverso}
                      etiqueta="Eliminar"
                      icono={<FaTrash/>}
                />,
                <Boton key={"boton-guardar"}
                      variant={TemaComponente.SuccessInverso}
                      etiqueta="Guardar"
                      icono={<FaRegPlusSquare/>}
                      onClick={() => {
                        if (ModificaUsuario.valida()) {
                         
                          ocultaModal()
                        }
                      }}
                />
              ]}
            />
            <Modal
              mostrar={mostrarModalFiltroElimr}
              muestraModal={muestraModalElimr}
              ocultaModal={ocultaModalElimr}
              variante={TemaComponente.Secundario}
              estiloVariante="close-footer"
              close="close"
              trigger={<Boton  rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
              contenido={<><p className="fs-5 text-center">¿Esta seguro que desea eliminar el
              filtro <strong> [{/*props.filtro.id*/}] </strong> ?</p></>}
              botones={[
                <Boton key={"boton-caneclar"}
                      variant={TemaComponente.DangerInverso}
                      etiqueta="Cancelar"
                      icono={<FcCancel/>}
                      onClick={ocultaModalElimr}/>,
                <Boton key={"boton-eliminar"}
                      variant={TemaComponente.PrimarioInverso}
                      etiqueta="Eliminar"
                      icono={<FaTrash/>}
                      onClick={() => {
                        ocultaModalElimr()
                      }}
                />,
              ]}

            />
        </div>
      </div>
      <div className='"card-body'>
        <div className='w-50 mx-auto my-2 d-flex justify-content-center'>
              <FaTimes className='filtro-icon'/>
              {/* {props.filtro.icono} */}
        </div>
          <h3 className='filtro-text'>
            {/* {props.filtro.descripcion} */}
            Aspirantes
          </h3>
        <br />
        <div className='badges d-flex flex-column gap-2'>
          <span className="w-100 badge rounded-pill fs-6 fw-light">
              {/* {props.filtro.tipo} */}
              comunidad
          </span>
        </div>
      </div>
    </div>
     

  );

  function muestraModal() {
    setMostrarModalFiltro(true)
  }

  function ocultaModal() {
    setMostrarModalFiltro(false)
  }

  function muestraModalElimr() {
    setMostrarModalFiltroElimr(true)
  }

  function ocultaModalElimr() {
    setMostrarModalFiltroElimr(false)
  }
}

CardFiltro.CardNuevoFiltro = (
  <div className="card-filtro-nuevo text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus/>
      </div>
      <br />
      <h3 className="card-title">Nuevo Filtro</h3>
    </div>
  </div>
)

export default CardFiltro




