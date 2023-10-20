import "./NavbarAgenda.scss"
import {TiDocumentText} from 'react-icons/ti';
import {CgCalendarToday} from 'react-icons/cg'
import BotonesFiltros from '../BtnFiltros/BtnsFiltros'
import Avatares from '../UserStatus/UserStatus'
import Campo from "../Campo";
import Boton from "../Boton";
import {TamanoComponente, TemaComponente} from "../../utils/Utils.ts";
import {FaRegListAlt} from "react-icons/fa";
import ChipUsuario from "../ChipUsuario";
import {TipoCampo} from "../Campo/Campo.tsx";

function NavbarAgenda() {
  return (
    <nav className="navbar navbar-expand-lg bg-tertiary">
      <div className="container gap-5 justify-content-between">
        <div className="d-flex flex-grow-1 gap-2">
          <Campo id="busqueda" placeholder="Placeholder...." tipoCampo={TipoCampo.Desplegable}/>
          <Campo id="busqueda" placeholder="Placeholder...."/>
          <Campo id="busqueda" placeholder="Placeholder...." tipoCampo={TipoCampo.Desplegable}/>
        </div>
        <Boton tema={TemaComponente.Secundario} etiqueta="Agenda" icono={<FaRegListAlt/>}/>
        <Boton tema={TemaComponente.Secundario} etiqueta="Más Eventos"/>
        <div className="d-flex gap-1">
          <ChipUsuario tamano={TamanoComponente.Sm}/>
          <ChipUsuario tamano={TamanoComponente.Sm}/>
          <ChipUsuario tamano={TamanoComponente.Sm}/>
          <ChipUsuario tamano={TamanoComponente.Sm}/>
        </div>
      </div>
    </nav>
  )


  switch (props.tipo) {
    case 1:
      return (
        <nav className='BarraFiltro d-flex justify-content-lg-between align-items-center'>
          <BotonesFiltros/>
          <div className='container d-flex justify-content-between cajita'>
            <button className='solo d-flex align-items-center mx-auto' id='calendario'>Calendario<CgCalendarToday/>
            </button>
            <button className='solo mx-auto' id='masEventos'>Más Eventos</button>
            <button className='solo mx-auto' id='administracion'>Administracion</button>
          </div>
        </nav>
      );
    case 2:
      return (
        <>
          <nav className='BarraFiltro d-flex justify-content-lg-between align-items-center'>
            <BotonesFiltros/>
            <div className='container d-flex justify-content-between cajita'>
              <button className='solo d-flex align-items-center  mx-auto' id='agenda'>Agenda<TiDocumentText/></button>
              <button className='solo mx-auto' id='masEventos'>Más Eventos</button>
              <button className='solo mx-auto' id='administracion'>Administracion</button>
            </div>
          </nav>
        </>
      );
    case 3:
      return (
        <>
          <nav className='BarraFiltro d-flex justify-content-lg-between align-items-center'>
            <BotonesFiltros/>
            <div className='container d-flex justify-content-between cajita'>
              <button className='solo d-flex align-items-center  mx-auto' id='agenda'>Agenda<TiDocumentText/></button>
              <button className='solo mx-auto' id='masEventos'>Más Eventos</button>
            </div>
            <div className='container d-flex max-w-full'>
              <Avatares imageUrl="https://picsum.photos/id/237/200/300" estado={2}/>
              <Avatares imageUrl="https://picsum.photos/id/238/200/300"/>
              <Avatares imageUrl="https://picsum.photos/id/220/200/300" estado={1}/>
            </div>
          </nav>
        </>
      );
    case 4:
      return (
        <>
          <nav className='BarraFiltro d-flex justify-content-lg-between align-items-center'>
            <BotonesFiltros/>
            <div className='container d-flex justify-content-between cajita'>
              <button className='solo d-flex align-items-center mx-auto' id='calendario'>Calendario<CgCalendarToday/>
              </button>
              <button className='solo mx-auto' id='masEventos'>Más Eventos</button>
            </div>
            <div className='container d-flex max-w-full' id='ContenerdorAvatares'>
              <Avatares imageUrl="https://picsum.photos/id/237/200/300" estado={2}/>
              <Avatares imageUrl="https://picsum.photos/id/238/200/300"/>
              <Avatares imageUrl="https://picsum.photos/id/220/200/300" estado={1}/>
            </div>
          </nav>
        </>
      );
  }
}

export default NavbarAgenda;
