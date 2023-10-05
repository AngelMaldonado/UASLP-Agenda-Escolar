import './NavbarAdmin.css'
import Boton from "../Boton";
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegCalendarAlt,
  FaRegFileImage,
  FaRegPlusSquare, FaRegSun,
  FaRegUser,
  FaStream
} from 'react-icons/fa'
import {ReactComponentElement, useState} from "react";
import {Campo} from "../Campo/Campo.tsx";
import {Tab, TabPanel, Tabs} from "react-tabs";
import Usuarios from "../Usuarios/Usuarios.tsx";

function NavbarAdmin() {
  const [tabIndex, setTabIndex] = useState(0)
  const cambiaOpcion = (n: number) => {
    setTabIndex(n)
  }

  const opciones: ReactComponentElement<typeof Boton>[] = [
    <Boton etiqueta='Tabla de Eventos' icono={<FaRegCalendarAlt/>} onClick={() => cambiaOpcion(0)}/>,
    <Boton etiqueta='Usuarios' icono={<FaRegUser/>} onClick={() => cambiaOpcion(1)}/>,
    <Boton etiqueta='Filtros' icono={<FaStream/>} onClick={() => cambiaOpcion(2)}/>,
    <Boton etiqueta='Símbolos' icono={<FaRegFileImage/>} onClick={() => cambiaOpcion(3)}/>,
    <Boton etiqueta='Crear Evento' icono={<FaRegPlusSquare/>} onClick={() => alert('Formulario Nuevo Evento')}/>
  ];

  return (
    <Tabs selectedIndex={tabIndex}>
      <header className='NavbarAdmin'>
        <ul className='Opciones'>
          <li className='ControladorMes'>
            <Boton icono={<FaAngleLeft/>} onClick={() => {
            }}/>
            <p>Enero</p>
            <Boton icono={<FaAngleRight/>} onClick={() => {
            }}/>
          </li>
          <li className='ControladorMes'>
            <Tab>
              <Boton etiqueta='Hoy' icono={<FaRegSun/>} onClick={() => {
              }}/>
            </Tab>
          </li>
        </ul>
        <ul className='Opciones'>
          {opciones.map((opcion, index) => (
            <li key={index}>{opcion}</li>
          ))}
        </ul>
      </header>
      <TabPanel>Tabla de eventos...</TabPanel>
      <TabPanel><Usuarios/></TabPanel>
      <TabPanel>Cards de filtros...</TabPanel>
      <TabPanel>Cards de simbolos...</TabPanel>
      <TabPanel>Cards de simbolos...</TabPanel>
    </Tabs>
  );
}

export default NavbarAdmin
