import './Publico.css'
import NavbarAdmin from "../../components/NavbarAdmin";
import {useNavigate} from "react-router-dom";

function Publico() {
  const navigate = useNavigate()
  return (
    <>
      <header className='header-uaslp'></header>
      <header className='header-agenda'>
        <button className='boton --secundario' onClick={() => navigate('/login')}>Administración</button>
      </header>
      <NavbarAdmin/>
    </>
  );
}

export default Publico
