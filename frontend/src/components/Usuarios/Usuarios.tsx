import "./_usuarios.scss"
import Boton from "../Boton";
import Modal from "../Modal";
import Usuario from "../../models/Usuario.ts"
import {useState} from "react"
import CardUsuario from "../CardUsuario";
import {TemaComponente} from "../../utils/Utils.ts";
import FormularioUsuario from "../FormularioUsuario";
import {useAgregaUsuario, useObtenUsuarios} from "../../hooks/HooksUsuario.ts";
import {FaRegPlusSquare, FaRegUser} from "react-icons/fa";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario())
  const {usuarios} = useObtenUsuarios()
  const {agregaUsuario} = useAgregaUsuario()

  return (
    <div className="cards-usuarios py-4 container">
      <Modal
        trigger={CardUsuario.CardNuevoUsuario}
        titulo={<div><FaRegUser/> <p className="fs-5">Nuevo Usuario</p></div>}
        contenido={<FormularioUsuario usuario={nuevoUsuario}/>}
        botones={[
          <Boton key={"boton-guardar"}
                 tema={TemaComponente.SuccessInverso}
                 etiqueta="Guardar"
                 icono={<FaRegPlusSquare/>}
                 onClick={guardaUsuario}
          />
        ]}
        onClose={() => setNuevoUsuario(new Usuario())}
        botonCancelar={true}
      />
      {usuarios?.map(usuario => {
        return <CardUsuario key={usuario.id} usuario={usuario}/>
      })}
    </div>
  );

  // !! Refactorizar
  function guardaUsuario() {
    let formulario = (document.getElementById("form-nuevo-usuario") as HTMLFormElement)
    //let campos = formulario.querySelectorAll("input")
    if (formulario.reportValidity()) {
      agregaUsuario(nuevoUsuario)
      setNuevoUsuario(new Usuario())
      /*
      formulario.reset()
      campos.forEach(campo => {
        campo.setAttribute("aria-selected", "false")
      })
       */
    }
  }
}

/*


function actualizaUsuarios() {
  UsuarioService.obtenUsuarios()
    .then(res => this.setState({usuarios: res.data})
    )
    .catch(err => {
        this.setState({usuarios: []})
        console.log(err)
      }
    )
}
 */

export default Usuarios;
