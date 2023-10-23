// TODO: Rerenderizar el modal unicamente al guardar para limpiar el formulario

import "./_usuarios.scss"
import React, {useState} from "react"
import Modal from "../Modal";
import Boton from "../Boton";
import CardUsuario from "../CardUsuario";
import FormularioUsuario from "../FormularioUsuario";
import {TemaComponente} from "../../utils/Utils.ts";
import {useAgregaUsuario, useObtenUsuarios} from "../../hooks/HooksUsuario.ts";
import {FaRegPlusSquare, FaRegUser, FaTimes} from "react-icons/fa";
import Usuario from "../../models/Usuario.ts"

export const UsuariosContext = React.createContext<Usuario>(new Usuario())

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState(new Usuario())
  const {usuarios} = useObtenUsuarios()
  const {agregaUsuario} = useAgregaUsuario()
  return (
    <div className="cards-usuarios py-4 container">
      <UsuariosContext.Provider value={nuevoUsuario}>
        <Modal
          titulo={<div><FaRegUser/> <p className="fs-5">Nuevo Usuario</p></div>}
          trigger={CardUsuario.CardNuevoUsuario}
          contenido={<FormularioUsuario key={nuevoUsuario.id} id="form-nuevo-usuario"/>}
          botones={[
            <Boton key={"boton-cancelar"} tema={TemaComponente.DangerInverso}
                   etiqueta="Cancelar"
                   icono={<FaTimes/>}
                   cierraModal={true}
            />,
            <Boton key={"boton-guardar"} tema={TemaComponente.SuccessInverso}
                   etiqueta="Guardar"
                   icono={<FaRegPlusSquare/>}
                   onClick={guardaUsuario}
                   cierraModal={true}
            />
          ]}
        />
      </UsuariosContext.Provider>
      {usuarios?.map(usuario => {
        return <CardUsuario key={usuario.id} usuario={usuario}/>
      })}
    </div>
  );

  // !! Refactorizar
  function guardaUsuario() {
    let formulario = (document.getElementById("form-nuevo-usuario") as HTMLFormElement)
    let campos = formulario.querySelectorAll("input")
    if (formulario.reportValidity()) {
      agregaUsuario(nuevoUsuario)
      setNuevoUsuario(new Usuario())
      formulario.reset()
      campos.forEach(campo => {
        campo.setAttribute("aria-selected", "false")
      })
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
