// TODO: mostrar mensaje de eliminación correcta
import "./_usuarios.scss";
import Boton from "../../Inputs/Boton";
import Modal from "../../Modales/Modal";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import CardUsuario from "../../Cards/CardUsuario";
import Usuario from "../../../models/Usuario.ts";
import FormularioUsuario from "../../Formularios/FormularioUsuario";
import {TemaComponente} from "../../../utils/Utils.ts";
import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";
import {
  useAgregaUsuario,
  useObtenUsuarios,
} from "../../../hooks/HooksUsuario.ts";
import {ValidationError} from "yup";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {PermisosEnum} from "../../../enums";
import useObjectAttributeChange, {useObjectChangeTimeout} from "../../../hooks/HookObjectChange.ts";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario());
  const [errores, setErrores] = useState({});
  const usuario = useContext(AgendaContext).data.usuario;
  const [files, setFiles] = useState();
  const [avatar, setAvatar] = useState("");

  const {usuarios} = useObtenUsuarios()
  const {agregaUsuario, registroExitoso, reset} = useAgregaUsuario(setErrores)
  const onUsuarioChange = useObjectAttributeChange(setNuevoUsuario as Dispatch<SetStateAction<Object>>)
  const onValidationError = useObjectChangeTimeout(setErrores)
  const uploadImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("files", files[0]);
    fetch("http://localhost:1337/api/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((datos) => {
        const imageId = datos[0].id;
        console.log(imageId);
        // const dat = new FormData();
        // dat.append("image", imageId);
        fetch("http://localhost:1337/api/usuarios/3", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              image: imageId.toString(),
            },
          }),
        })
          .then((resp) => resp.json())
          .then((datos) => {
            console.log(datos);

            fetch(`http://localhost:1337/api/upload/files/${imageId}`)
              .then((res) => res.json())
              .then((img) => {
                const url = `http://localhost:1337${img.url}`;
                setAvatar(url);
                console.log(img.url);
              });
          });
      });
  };

  return (
    <div className="cards-usuarios py-4 container">
      {usuario?.permisos?.includes(PermisosEnum.CREAR_USUARIO)
        ? modalNuevoUsuario()
        : null}
      {usuarios?.map((usuario) => {
        return <CardUsuario key={"usuario-" + usuario.id} usuario={usuario}/>;
      })}

      <div className="form">
        <form action="" method="post" id="frmAvatar" onSubmit={uploadImage}>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            placeholder="Selecciona una imagen"
          />
          <button type="submit">Cargar</button>
        </form>
      </div>
      <img src={avatar} alt=""/>
    </div>
  );

  function modalNuevoUsuario() {
    return (
      <Modal
        onClose={onClose}
        trigger={CardUsuario.CardNuevoUsuario}
        titulo={<div><FaRegUser/><p className="fs-5">Nuevo Usuario</p></div>}
        contenido={contenidoModal()}
        timeout={registroExitoso ? 2000 : undefined}
        sinFondo={registroExitoso}
        botones={!registroExitoso ? [
          <Boton key={"boton-guardar"}
                 variant={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={agregaNuevoUsuario}
          />
        ] : []}
      />
    )
  }

  function contenidoModal() {
    if (registroExitoso) return <p>El usuario se agregó con éxito</p>;
    else
      return (
        <FormularioUsuario
          usuario={nuevoUsuario}
          setUsuario={onUsuarioChange}
          errores={errores}
        />
      );
  }

  function agregaNuevoUsuario() {
    // Valida el nuevoUsuario antes de enviar a back
    Usuario.schema.validate(nuevoUsuario)
      // Si se validó correctamente, enviar a back
      .then(_ => agregaUsuario(nuevoUsuario))
      // Si no coincide con el esquema, mostrar errores en formulario
      .catch((r: ValidationError) => onValidationError({[r.path!]: r.errors}))
  }

  function onClose() {
    reset()
    setErrores({})
    setNuevoUsuario(new Usuario())
  }
}

export default Usuarios;
