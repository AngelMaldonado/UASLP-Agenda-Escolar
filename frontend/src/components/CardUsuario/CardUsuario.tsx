import "./card-usuario.scss"
import Usuario from "../../models/Usuario.ts"
import Boton from "../Boton"
import {FaPlus, FaRegEdit, FaRegPlusSquare, FaRegTrashAlt, FaRegUser} from "react-icons/fa"
import {TemaComponente} from "../../utils/Utils.ts"
import FormularioUsuario from "../FormularioUsuario";
import Modal from "../Modal";

function CardUsuario(props: { usuario: Usuario }) {
  return (
    <div key={props.usuario.id} className="card card-usuario text-center">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
        <p className="m-0">#{props.usuario.id}</p>
        {/*<div className="d-inline-flex">
          <Modal
            titulo={<div><FaRegUser/> <p className="fs-5">Nuevo Usuario</p></div>}
            trigger={<Boton tema={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>}/>}
            contenido={<FormularioUsuario key={props.usuario.id} usuario={props.usuario}/>}
            botones={[
              <Boton key={"boton-guardar"} tema={TemaComponente.SuccessInverso}
                     etiqueta="Guardar"
                     icono={<FaRegPlusSquare/>}
              />
            ]}
          />
          <Boton tema={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>} onClick={() => alert("delete")}/>
        </div>*/}
      </div>
      <div className="card-body">
        <div className="w-50 mx-auto my-2 position-relative">
          <img className="w-100 rounded-circle" src="./src/assets/example.jpg" alt="example"/>
          <span className="position-absolute bottom-0 end-0 p-3 bg-success rounded-circle"></span>
        </div>
        <h3 className="card-title flex-fill">{props.usuario.nombre}</h3>
        <p className="card-text">{props.usuario.email}</p>
        <div className="badges d-flex flex-column gap-2">
            <span className="w-100 badge rounded-pill fs-6 fw-light">
              {props.usuario.permisos.length} Permisos
            </span>
          <span className="w-100 badge rounded-pill fs-6 fw-light">{props.usuario.tipo}</span>
        </div>
      </div>
    </div>
  );
}

CardUsuario.CardNuevoUsuario = (
  <div className="card card-nuevo-usuario text-center">
    <div className="card-body">
      <div className="new-icon">
        <FaPlus/>
      </div>
      <h3 className="card-title">Nuevo Usuario</h3>
    </div>
  </div>
)

export default CardUsuario;
