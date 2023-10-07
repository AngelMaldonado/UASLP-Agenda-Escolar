import './Administrador.css'
import NavbarAdmin from "../../components/NavbarAdmin";
import Calendar from '../../components/Klendario/Calendario';


function Administrador() {
  return (
    <>
      <header className='header-uaslp'></header>
      <header className='header-agenda'>
      </header>
      <NavbarAdmin/>
      <Calendar/>
    </>
  );
}

export default Administrador
