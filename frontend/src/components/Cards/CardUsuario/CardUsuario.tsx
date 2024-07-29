import "./_card-usuario.scss"
import Usuario from "../../../models/Usuario.ts"
import Boton from "../../Inputs/Boton"
import { FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser } from "react-icons/fa"
import { TemaComponente } from "../../../utils/Tipos.ts"
import Modal from "../../Modales/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import { useModificaUsuario, useEliminaUsuario } from "../../../hooks/HooksUsuario.ts";
import useObjectAttributeChange, { useObjectChangeTimeout } from "../../../hooks/HookObjectChange.ts";
import { PermisosEnum, TipoUsuarioEnum } from "../../../enums";
import { ValidationError } from "yup";
import { useObtenSesion } from "../../../hooks/HookSesion.ts";
import { modalTimeout } from "../../../utils/Constantes.ts";
import { Spinner } from "react-bootstrap";

function CardUsuario(props: { usuario: Usuario }) {
  const [usuarioActual, setUsuarioActual] = useState(props.usuario)
  const [errores, setErrores] = useState({})
  const [eliminandoSt, setEliminandoSt] = useState(false)

  const usuario = useObtenSesion().sesion?.usuario;
  const { modificaUsuario, modificacionExitosa, modificando, reset } = useModificaUsuario(setErrores)
  const { eliminaUsuario, eliminacionExitosa, eliminando } = useEliminaUsuario(setErrores)
  const onUsuarioChange = useObjectAttributeChange(setUsuarioActual as Dispatch<SetStateAction<object>>)
  const onValidationError = useObjectChangeTimeout(setErrores as Dispatch<SetStateAction<object>>)

  const nombres = props.usuario.nombre?.split(" ")
  const siglas = nombres![0][0] + (nombres && nombres.length > 1 ? nombres[1][0] : "")

  return (
    <div className="card card-usuario text-center">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
        <p className="m-0">#{props.usuario.id}</p>
        <div className="d-inline-flex gap-1">
          {modalUsuario()}
        </div>
      </div>
      <div className="card-body">
        <div className="ChipUsuario mx-auto bg-dark-subtle position-relative rounded-circle text-center fs-2">
          {siglas}
        </div>
        <h3 className="card-title flex-fill">{props.usuario.nombre + " " + props.usuario.apellido}</h3>
        <p className="card-text">{props.usuario.email}</p>
        <div className="badges d-flex flex-column gap-2">
          <span
            className="w-100 badge rounded-pill fs-6 fw-light">{props.usuario.tipo![0].toUpperCase() + props.usuario.tipo?.substring(1)}</span>
        </div>
      </div>
    </div>
  );

  function modalUsuario() {
    return (
      <Modal
        sinFondo={eliminandoSt || eliminacionExitosa || modificacionExitosa}
        cancelar={!modificacionExitosa && !eliminacionExitosa && !modificando && !eliminando}
        timeout={modificacionExitosa ? modalTimeout : undefined}
        triggers={triggers()}
        onClose={onClose}
        titulo={<div><FaRegUser /> <p className="fs-5">Modificar Usuario</p></div>}
        contenido={contenidoModal()}
        botones={modificacionExitosa || eliminacionExitosa ? undefined : botonesModal()}
      />
    )
  }

  function triggers(): React.ReactElement[] {
    const esAdministrador = usuarioActual?.tipo?.includes(TipoUsuarioEnum.ADMINISTRADOR);
    const esBEcario = usuario?.tipo?.includes(TipoUsuarioEnum.BECARIO);
    const esSecundario = usuario?.tipo?.includes(TipoUsuarioEnum.SECUNDARIO);
    const tienePermisoModificar = usuario?.permisos?.includes(PermisosEnum.MODIFICAR_USUARIO);
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_USUARIO);

    return ([
      tienePermisoModificar && (
        esBEcario || esSecundario ?
          !esAdministrador ?
            <Boton
              key={"boton-modificar-usuario-" + props.usuario.id}
              rounded
              variant={TemaComponente.PrimarioInverso}
              icono={<FaRegEdit />}
              onClick={() => setEliminandoSt(false)}
            /> : undefined
          :
          <Boton
            key={"boton-eliminar-usuario-" + props.usuario.id}
            rounded
            variant={TemaComponente.PrimarioInverso}
            icono={<FaRegEdit />}
            onClick={() => setEliminandoSt(false)}
          />
      ),
      usuario?.id === props.usuario.id ? null : (
        tienePermisoEliminar && (
          !esAdministrador ?
            <Boton
              key={"boton-eliminar-usuario-" + props.usuario.id}
              rounded
              variant={TemaComponente.DangerInverso}
              icono={<FaRegTrashAlt />}
              onClick={() => setEliminandoSt(true)}
            />
            : undefined
        )
      )
    ] as React.ReactElement[]);
  }


  function contenidoModal() {
    if (modificacionExitosa) {
      return <p className="text-center">El usuario se modificó correctamente</p>
    } else if (eliminacionExitosa) {
      return <p className="text-center">El usuario se eliminó correctamente</p>
    } else if (eliminandoSt) {
      return <p className="fs-5 text-center">
        ¿Esta seguro que desea eliminar el
        usuario <strong> [{props.usuario.nombre + " " + props.usuario.apellido}] </strong> ?
      </p>
    } else return <FormularioUsuario usuario={usuarioActual} setUsuario={onUsuarioChange} errores={errores} />
  }

  function botonesModal() {
    const tienePermisoEliminar = usuario?.permisos?.includes(PermisosEnum.ELIMINAR_USUARIO);
    const botones = []
    if (usuario?.id !== props.usuario.id && tienePermisoEliminar)
      botones.push(
        <Boton key={"boton-eliminar"}
          variant={TemaComponente.PrimarioInverso}
          icono={eliminando ?
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : <FaRegTrashAlt />
          }
          disabled={modificando || eliminando}
          etiqueta={!eliminando ? "Eliminar" : "Eliminando..."}
          onClick={() => eliminandoSt ? eliminaUsuario(usuarioActual) : setEliminandoSt(true)}
        />)
    if (!eliminandoSt)
      botones.push(
        <Boton key={"boton-guardar"}
          variant={TemaComponente.SuccessInverso}
          icono={modificando ?
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : <FaRegPlusSquare />
          }
          disabled={modificando || eliminando}
          etiqueta={!modificando ? "Guardar" : "Guardando..."}
          onClick={modificaUsuarioExistente}
        />
      )
    return botones
  }

  function modificaUsuarioExistente() {
    // Valida el nuevoUsuario antes de enviar a back
    Usuario.schema.validate(usuarioActual)
      // Si se validó correctamente, enviar a back
      .then(() => modificaUsuario(usuarioActual))
      // Si no coincide con el esquema, mostrar errores
      .catch((r: ValidationError) => onValidationError({ [r.path!]: r.errors }))
  }

  function onClose() {
    reset()
    setUsuarioActual(props.usuario)
    setErrores({})
    setEliminandoSt(false)
  }
}

CardUsuario.CardNuevoUsuario = (
  <div className="card card-nuevo-usuario text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus />
      </div>
      <h3 className="card-title">Nuevo Usuario</h3>
    </div>
  </div>
)

export default CardUsuario;
