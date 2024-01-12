import Card from 'react-bootstrap/Card';
import Boton from "../../Inputs/Boton";
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaStream, FaTimes, FaTrash} from "react-icons/fa";
import './_card-simbolo.scss';
import {TemaComponente} from '../../../utils/Utils.ts';
import Simbologia from "../../../models/Simbologia.ts";
import Modal from "../../Modales/Modal";
import {TiCancel} from "react-icons/ti";
import FormularioSimbolo from "../../Formularios/FormularioSimbolo";
import {useState} from "react";
import {useEliminaSimbolo, useModificaSimbolo} from "../../../hooks/HooksSimbolo.ts";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {Image} from "react-bootstrap";

type CardSimboloProps = {
  simbologia: Simbologia
}

function CardSimbolo(props: CardSimboloProps) {
  const [modalModificar, setModalModificar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [simbologia, setSimbologia] = useState(props.simbologia)

  const {modificaSimbolo} = useModificaSimbolo()
  const {eliminaSimbolo} = useEliminaSimbolo()

  const cambiaSimbolo = {
    onSingleChange: ((field: string, value: string | File) => setSimbologia(prevState => ({
      ...prevState, [field]: value
    }))),
  }

  return (
    <Card className="CardSimbolo">
      <Card.Body>
        <Card.Title>
          {botonModificar()}
          {botonEliminar()}
        </Card.Title>
      </Card.Body>
      <Card.Img variant="bottom"
                src={Configuraciones.apiURL + simbologia.simbolo}
                alt={`Imagen simbología ${simbologia.id}`}/>
    </Card>
  );

  function botonModificar() {
    return (
      <Modal
        mostrar={modalModificar}
        muestraModal={muestraModificar}
        ocultaModal={ocultaModificar}
        titulo={<div><FaStream/> <p className="fs-5">Modificar Símbolo</p></div>}
        trigger={<Boton rounded={true} variant={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
        contenido={<FormularioSimbolo simbologia={simbologia} {...cambiaSimbolo}/>}
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
                   if (FormularioSimbolo.valida()) {
                     modificaSimbolo(simbologia)
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
            ¿Esta seguro que desea eliminar el símbolo [
            <Image thumbnail width={30} src={Configuraciones.apiURL + simbologia.simbolo}/>]?
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
                   eliminaSimbolo(simbologia)
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
