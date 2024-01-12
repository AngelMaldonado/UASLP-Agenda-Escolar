import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import {TemaComponente} from "../../../utils/Utils.ts";
import Modal from '../../Modales/Modal/Modal.tsx'
import './_simbolos.scss'
import {useState} from "react"
import Boton from "../../Inputs/Boton";
import Simbologia from "../../../models/Simbologia.ts";
import CardSimbolo from "../../Cards/CardSimbolo";
import {useAgregaSimbolo, useObtenSimbolos} from "../../../hooks/HooksSimbolo.ts";
import FormularioSimbolo from "../../Formularios/FormularioSimbolo";

function Simbolos() {
  const [nuevoSimbolo, setNuevoSimbolo] = useState(new Simbologia())
  const [mostrarModal, setMostrarModal] = useState(false)

  const {simbolos} = useObtenSimbolos()
  const {agregaSimbolo} = useAgregaSimbolo()

  const cambiaSimbolo = {
    onSingleChange: ((field: string, value: string | File) => setNuevoSimbolo(prevState => ({
      ...prevState, [field]: value
    }))),
  }

  return (
    <div className="cards-filtros py-4 container">
      <Modal
        mostrar={mostrarModal}
        muestraModal={muestraModal}
        ocultaModal={ocultaModal}
        trigger={CardSimbolo.CardNuevoSimbolo}
        titulo={<div><FaRegUser/><p className="fs-5">Nuevo Símbolo</p></div>}
        contenido={<FormularioSimbolo simbologia={nuevoSimbolo} {...cambiaSimbolo}/>}
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
                   if (FormularioSimbolo.valida()) {
                     agregaSimbolo(nuevoSimbolo)
                     ocultaModal()
                   }
                 }}
          />
        ]}
      />
      {simbolos?.map(simbolo => {
        return <CardSimbolo key={"simbolo-" + simbolo.id} simbologia={simbolo}/>
      })}
    </div>
  );

  function muestraModal() {
    setMostrarModal(true)
  }

  function ocultaModal() {
    setNuevoSimbolo(new Simbologia())
    setMostrarModal(false)
  }
}

export default Simbolos;
