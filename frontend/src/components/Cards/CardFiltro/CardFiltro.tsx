import './CardFiltro.scss'
import Boton from "../../Inputs/Boton"
import Modal from "../../Modales/Modal";
import {useState} from "react";
import {TemaComponente} from "../../../utils/Utils.ts"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaStream, FaTimes, FaTrash} from "react-icons/fa"
import {Badge, Image} from "react-bootstrap";
import Configuraciones from "../../../utils/Configuraciones.ts";
import Filtro from "../../../models/Filtro.ts";
import Card from "react-bootstrap/Card";
import FormularioFiltro from "../../Formularios/FormularioFiltro/FormularioFiltro.tsx";
import {useEliminaFiltro, useModificaFiltro} from "../../../hooks/HooksFiltros.ts";
import {TiCancel} from "react-icons/ti";

type CardFiltroProps = {
  filtro: Filtro
}

function CardFiltro(props: CardFiltroProps) {
  const [modalModificar, setModalModificar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [filtro, setFiltro] = useState(props.filtro)

  const {modificaFiltro} = useModificaFiltro()
  const {eliminaFiltro} = useEliminaFiltro()

  const cambiaFiltro = {
    onSingleChange: ((field: string, value: string | File) => setFiltro(prevState => ({
      ...prevState, [field]: value
    }))),
  }

  return (
    <Card text="primary" className="CardFiltro">
      <Card.Body>
        <Card.Title>
          {botonModificar()}
          {botonEliminar()}
        </Card.Title>
        <div className="Icono">
          <Image className="h-100" src={Configuraciones.apiURL + props.filtro.icono}/>
        </div>
        <Card.Text>
          {props.filtro.nombre}
        </Card.Text>
        <Badge pill bg="secondary">
          {props.filtro.categoria[0].toUpperCase() + props.filtro.categoria.slice(1)}
        </Badge>
      </Card.Body>
    </Card>
  );

  function botonModificar() {
    return (
      <Modal
        mostrar={modalModificar}
        muestraModal={muestraModificar}
        ocultaModal={ocultaModificar}
        titulo={<div><FaStream/> <p className="fs-5">Modificar Filtro</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
        contenido={<FormularioFiltro filtro={filtro} {...cambiaFiltro}/>}
        botones={[
          <Boton key={"boton-caneclar"}
                 variant={TemaComponente.PrimarioInverso}
                 etiqueta="Cancelar"
                 icono={<FaTimes/>}
                 onClick={ocultaModificar}
          />,
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
                   if (FormularioFiltro.valida()) {
                     modificaFiltro(filtro)
                     ocultaModificar()
                   }
                 }}
          />
        ]}
      />
    )
  }

  function botonEliminar() {
    return (
      <Modal
        sinFondo
        mostrar={modalEliminar}
        muestraModal={muestraEliminar}
        ocultaModal={ocultaEliminar}
        trigger={<Boton rounded={true} variant={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>}/>}
        contenido={
          <p className="fs-5 text-center">
            ¿Esta seguro que desea eliminar el filtro <strong>[{filtro.nombre}]</strong>?
          </p>
        }
        botones={[
          <Boton key={"boton-caneclar"}
                 variant={TemaComponente.DangerInverso}
                 etiqueta="Cancelar"
                 icono={<TiCancel/>}
                 onClick={ocultaEliminar}/>,
          <Boton key={"boton-eliminar"}
                 variant={TemaComponente.PrimarioInverso}
                 etiqueta="Eliminar"
                 icono={<FaTrash/>}
                 onClick={() => {
                   eliminaFiltro(filtro)
                   ocultaEliminar()
                 }}
          />,
        ]}
      />
    )
  }

  function muestraModificar() {
    setModalModificar(true)
  }

  function ocultaModificar() {
    setModalModificar(false)
  }

  function muestraEliminar() {
    setModalEliminar(true)
  }

  function ocultaEliminar() {
    setModalEliminar(false)
  }
}

CardFiltro.CardNuevoFiltro = (
  <div className="card-filtro-nuevo text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus/>
      </div>
      <br/>
      <h3 className="card-title">Nuevo Filtro</h3>
    </div>
  </div>
)

export default CardFiltro
