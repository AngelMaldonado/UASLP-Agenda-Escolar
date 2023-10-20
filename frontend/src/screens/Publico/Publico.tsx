import './Publico.css'
import NavbarAdmin from "../../components/NavbarAdmin";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar';
import Calendario from '../../components/Klendario/Calendario';

function Publico() {
  const navigate = useNavigate()
  return (
    <>
      <header className='header-uaslp'></header>
      <header className='header-agenda'>
        <button className='boton --secundario' onClick={() => navigate('/login')}>Administración</button>
      </header>
      <NavbarAdmin/>
      <div className='flex'>
         <Calendario/>
         <div className='smallCalendar'>
         <Calendar 
          
          locale = 'es'
         />
         </div>

      </div>

    </>
  );
}

export default Publico
