import './CardFiltro.scss'
import Boton from "../../Inputs/Boton"
import Modal from "../../Modales/Modal";
import {Dispatch, SetStateAction, useState} from "react";
import {TemaComponente} from "../../../utils/Tipos.ts"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser} from "react-icons/fa"
import {Badge, Image} from "react-bootstrap";
import {Configuraciones, modalTimeout} from "../../../utils/Constantes.ts";
import Filtro from "../../../models/Filtro.ts";
import Card from "react-bootstrap/Card";
import FormularioFiltro from "../../Formularios/FormularioFiltro/FormularioFiltro.tsx";
import {useEliminaFiltro, useModificaFiltro} from "../../../hooks/HooksFiltro.ts";
import useObjectAttributeChange from "../../../hooks/HookObjectChange.ts";
import {PermisosEnum} from "../../../enums";
import {useObtenSesion} from "../../../hooks/HookSesion.ts";

type CardFiltroProps = {
  filtro: Filtro
}

function CardFiltro(props: CardFiltroProps) {
  const [filtro, setFiltro] = useState(props.filtro)
  const [errores, setErrores] = useState({})
  const [eliminando, setEliminando] = useState(false)
  const usuario = useObtenSesion().sesion?.usuario;

  const {
    modificaFiltro,
    modificacionExitosa,
    reset
  } = useModificaFiltro(setErrores)
  const {eliminaFiltro, eliminacionExitosa} = useEliminaFiltro(setErrores)
  const cambiaFiltro = useObjectAttributeChange(setFiltro as Dispatch<SetStateAction<Object>>)

  return (
    <Card text="primary" className="CardFiltro">
      <Card.Body>
        <Card.Title>
          {modalFiltro()}
        </Card.Title>
        <div className="Icono">
          <Image className="h-100" src={Configuraciones.publicURL + props.filtro.icono}/>
        </div>
        <Card.Text>
          {props.filtro.nombre}
        </Card.Text>
        <Badge pill bg="secondary">
          {props.filtro.categoria![0].toUpperCase() + props.filtro.categoria!.slice(1)}
        </Badge>
      </Card.Body>
    </Card>
  );

  function modalFiltro() {
    return (
      <Modal
        sinFondo={eliminando || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa}
        timeout={modificacionExitosa ? modalTimeout : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegUser/> <p className="fs-5">Modificar Filtro</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? [] : botonesModal()}
      />
    )
  }

  function triggers(): React.ReactElement[] {
    const tienePermisoModificar = usuario?.permisos?.includes(PermisosEnum.MODIFICAR_FILTRO);
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_FILTRO);

    return ([
      tienePermisoModificar && (
        <Boton key={"boton-modificar-filtro-" + props.filtro.id}
               rounded
               variant={TemaComponente.PrimarioInverso}
               icono={<FaRegEdit/>}
               onClick={() => setEliminando(false)}
        />
      ),
      tienePermisoEliminar && (
        <Boton key={"eliminar-filtro-" + props.filtro.id}
               rounded
               variant={TemaComponente.DangerInverso}
               icono={<FaRegTrashAlt/>}
               onClick={() => setEliminando(true)}
        />
      ),
    ] as React.ReactElement[]);
  }

  function contenidoModal() {
    if (modificacionExitosa) {
      return <p key="texto-modificacion" className="text-center">El filtro se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p key="texto-eliminacion" className="text-center">El filtro se eliminó correctamente</p>
    } else if (eliminando) {
      return <p className="fs-5 text-center" key="texto-eliminando">
        ¿Esta seguro que desea eliminar el
        filtro <strong> [{props.filtro.nombre}] </strong> ?
      </p>
    } else return <FormularioFiltro key="formulario-modificacion"
                                    filtro={filtro}
                                    setFiltro={cambiaFiltro}
                                    errores={errores}/>
  }

  function botonesModal() {
    return [
      <Boton key={"boton-eliminar"}
             variant={TemaComponente.PrimarioInverso}
             etiqueta="Eliminar"
             icono={<FaRegTrashAlt/>}
             onClick={() => eliminando ? eliminaFiltro(filtro) : setEliminando(true)}
      />,
      !eliminando ?
        <Boton key={"boton-guardar"}
               variant={TemaComponente.SuccessInverso}
               etiqueta="Guardar"
               icono={<FaRegPlusSquare/>}
               onClick={modificaFiltroExistente}
        /> : <></>
    ]
  }

  function modificaFiltroExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Filtro.schema.validate(filtro)
      // Si se validó correctamente, enviar a back
      .then(_ => modificaFiltro(filtro))
      // Si no coincide con el esquema, mostrar errores
      .catch(r => console.log(r))
  }

  function onClose() {
    reset()
    setFiltro(props.filtro)
    setErrores({})
    setEliminando(false)
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