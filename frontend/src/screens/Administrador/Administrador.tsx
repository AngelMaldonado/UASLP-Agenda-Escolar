import './_administrador.scss'
import NavbarAdmin from "../../components/NavbarAdmin";
import Usuarios from "../../components/Usuarios/Usuarios.tsx";

function Administrador() {
  return (
    <>
      <header className='header-uaslp'></header>
      <header className='header-agenda'></header>
      <NavbarAdmin/>
      <Usuarios/>
    </>
  );
}

export default Administrador
