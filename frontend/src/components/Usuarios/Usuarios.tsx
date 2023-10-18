import "./_usuarios.scss"
import {useEffect, useState} from "react"
import Modal from "../Modal"
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario.tsx"
import Usuario from "../../models/Usuario.ts"
import UsuarioService from "../../services/UsuarioService.ts"
import CardUsuario from "../CardUsuario"
import {FaRegUser} from "react-icons/fa";
import Boton from "../Boton";

function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    setUsuarios([])
    UsuarioService.obtenUsuarios()
      .then(res => setUsuarios(res.data))
      .catch(err => {
        setUsuarios([])
        console.log(err)
      })
  }, []);

  return (
    <div className="cards-usuarios py-4 container">
      <Modal
        titulo={<div><FaRegUser/> <p className="fs-5">Nuevo Usuario</p></div>}
        trigger={CardUsuario.CardNuevoUsuario}
        contenido={<FormularioUsuario/>}
        botones={[<Boton etiqueta="Nuevo"/>, <Boton etiqueta="Nuevo"/>]}
      />
      {usuarios.length > 0 && usuarios.map((usuario) => (
        <CardUsuario usuario={usuario}/>
      ))}
    </div>
  );
}

export default Usuarios;
