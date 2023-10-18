import "./card-usuario.scss"
import {Component, ReactElement} from "react"
import Usuario from "../../models/Usuario.ts"
import Boton from "../Boton"
import {FaPlus, FaRegEdit, FaRegTrashAlt} from "react-icons/fa"
import {TemaComponente} from "../../utils/Utils.ts"

class CardUsuario extends Component<{ usuario: Usuario }> {
  render() {
    return (
      <div key={this.props.usuario.id} className="card card-usuario text-center">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0">
          <p className="m-0">#{this.props.usuario.id}</p>
          <div className="d-inline-flex">
            <Boton tema={TemaComponente.PrimarioInverso} icono={<FaRegEdit/>} onClick={() => alert("edit")}/>
            <Boton tema={TemaComponente.DangerInverso} icono={<FaRegTrashAlt/>} onClick={() => alert("delete")}/>
          </div>
        </div>
        <div className="card-body">
          <div className="w-50 mx-auto my-2 position-relative">
            <img className="w-100 rounded-circle" src="./src/assets/example.jpg" alt="example"/>
            <span className="position-absolute bottom-0 end-0 p-3 bg-success rounded-circle"></span>
          </div>
          <h3 className="card-title flex-fill">{this.props.usuario.nombre}</h3>
          <p className="card-text">{this.props.usuario.email}</p>
          <div className="badges d-flex flex-column gap-2">
            <span className="w-100 badge rounded-pill fs-6 fw-light">Mi fuente</span>
            <span className="w-100 badge rounded-pill fs-6 fw-light">Administrador secundario</span>
          </div>
        </div>
      </div>
    );
  }

  static CardNuevoUsuario: ReactElement = (
    <div className="card card-nuevo-usuario text-center">
      <div className="card-body">
        <div className="new-icon">
          <FaPlus/>
        </div>
        <h3 className="card-title">Nuevo Usuario</h3>
      </div>
    </div>
  )
}

export default CardUsuario;
