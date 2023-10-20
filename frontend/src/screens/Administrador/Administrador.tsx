import './_administrador.scss'
import NavbarAdmin from "../../components/NavbarAdmin";
import Usuarios from "../../components/Usuarios/Usuarios.tsx";
import NavbarAgenda from "../../components/NavbarAgenda/NavbarAgenda.tsx";
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

function Administrador() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <header className='header-uaslp'></header>
      <NavbarAgenda/>
      <NavbarAdmin/>
      <Usuarios/>
      {/*<Calendar/>*/}
    </>
  );
}

export default Administrador
