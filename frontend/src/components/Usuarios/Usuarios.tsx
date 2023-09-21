import {useEffect, useState} from 'react';
import './Usuarios.css'
import CardUsuario from "../CardUsuario";
import Modal from "../Modal";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario.tsx";
import IUsuario from "../../models/IUsuario.ts";
import UsuarioService from "../../services/UsuarioService.ts";

interface IUsuariosState {
  cargando: boolean,
  usuarios: IUsuario[],
  errorMsg: string,
  mostrarModal: boolean
}

function Usuarios() {
  const [state, setState] = useState<IUsuariosState>({
    cargando: false,
    usuarios: [],
    errorMsg: "",
    mostrarModal: false
  })

  useEffect(() => {
    setState({...state, cargando: true})
    UsuarioService.obtenUsuarios()
      .then(res => setState({
        ...state, cargando: false, usuarios: res.data
      }))
      .catch(err => setState({
        ...state, cargando: false, errorMsg: err.message
      }))
  }, []);

  const muestraModal = () => {
    setState({...state, mostrarModal: !state.mostrarModal})
  }

  const {cargando, usuarios, errorMsg, mostrarModal} = state

  return (
    <div>
      <Modal componente={<FormularioUsuario/>} mostrar={mostrarModal} onClose={() => muestraModal()}/>
      <section className="ContenedorUsuarios">
        {errorMsg && (<p>{errorMsg}</p>)}
        {cargando && (<h1>Cargando...</h1>)}
        <button className="NewCard" onClick={muestraModal}>
          <div id="circle">
            <i className='bx bx-plus-circle tam'></i>
          </div>
          <br/><br/>
          <h3>Nuevo usuario</h3>
        </button>
        {usuarios.length > 0 && usuarios.map((usuario) => (
          <CardUsuario {...usuario} />
        ))}
      </section>
    </div>
  );
}

export default Usuarios;
