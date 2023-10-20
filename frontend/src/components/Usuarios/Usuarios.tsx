import "./_usuarios.scss"
import React from "react"
import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import Boton from "../Boton";
import Modal from "../Modal"
import Usuario from "../../models/Usuario.ts"
import CardUsuario from "../CardUsuario"
import UsuarioService from "../../services/UsuarioService.ts"
import {TemaComponente} from "../../utils/Utils.ts";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario.tsx"

export const UsuariosContext = React.createContext<Usuario>(new Usuario())

interface UsuariosState {
  usuarios: Usuario[],
  nuevoUsuario: Usuario
}

class Usuarios extends React.Component<any, UsuariosState> {
  constructor(props: any) {
    super(props);
    this.state = {usuarios: [], nuevoUsuario: new Usuario()}
  }

  render() {
    return (
      <div className="cards-usuarios py-4 container">
        <UsuariosContext.Provider value={this.state.nuevoUsuario}>
          <Modal
            titulo={<div><FaRegUser/> <p className="fs-5">Nuevo Usuario</p></div>}
            trigger={CardUsuario.CardNuevoUsuario}
            contenido={<FormularioUsuario/>}
            botones={[
              <Boton key={"boton-cancelar"} tema={TemaComponente.DangerInverso}
                     etiqueta="Cancelar"
                     icono={<FaTimes/>}/>,
              <Boton key={"boton-guardar"} tema={TemaComponente.SuccessInverso}
                     etiqueta="Guardar"
                     icono={<FaRegPlusSquare/>}
                     onClick={this.guardaUsuario}
              />
            ]}
          />
        </UsuariosContext.Provider>
        {this.state.usuarios.length > 0 && this.state.usuarios.map((usuario) => (
          <CardUsuario usuario={usuario}/>
        ))}
      </div>
    );
  }

  private obtenUsuarios() {
    let usuarios: Usuario[] = []
    UsuarioService.obtenUsuarios()
      .then(res => {
        usuarios = res.data
      })
      .catch(err => {
        console.log(err)
      })
    return usuarios
  }

  private guardaUsuario() {
    UsuarioService.nuevo(this.state.nuevoUsuario)
  }

  private actualizaUsuarios() {
    UsuarioService.obtenUsuarios()
      .then(res => this.setState({usuarios: res.data})
      )
      .catch(err => {
          this.setState({usuarios: []})
          console.log(err)
        }
      )
  }
}

export default Usuarios;
