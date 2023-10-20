import './_administrador.scss'
import NavbarAdmin from "../../components/NavbarAdmin";
import Usuarios from "../../components/Usuarios/Usuarios.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";

function Administrador() {
  return (
    <>
      <header className='header-uaslp'></header>
      <NavbarAgenda/>
      <NavbarAdmin/>
      <Usuarios/>
    </>
  );
}

export default Administrador
