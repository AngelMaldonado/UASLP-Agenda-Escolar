// import {Campo, TipoCampo} from '../Campo/Campo';
import {TiDocumentText}  from 'react-icons/ti';
import {CgCalendarToday} from 'react-icons/cg'
import './navbarAgenda.css'
import  BotonesFiltros from '../BtnFiltros/BtnsFiltros'
import  Avatares from '../UserStatus/UserStatus'
// import React, { useState } from 'react'

// import React from 'react';



// interface nabvarAgendaTipo
// {  
//     tipoNavBar: number,
//     value: 1 | 2;
//     tipo: number,
//     value2: 1 | 2;
// }



function Header(props) {
  switch (props.tipo) {
      case 1: 
        return (
        <nav className='BarraFiltro d-flex justify-content-lg-between align-items-center'>
          <BotonesFiltros/>
          <div className='container d-flex justify-content-between cajita'>
            <button className='solo d-flex align-items-center mx-auto'id='calendario'>Calendario<CgCalendarToday/></button>
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
            <button className='solo d-flex align-items-center  mx-auto'id='agenda'>Agenda<TiDocumentText /></button>
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
              <button className='solo d-flex align-items-center  mx-auto'id='agenda'>Agenda<TiDocumentText /></button>
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
                <div className='container d-flex justify-content-between cajita' >
                  <button className='solo d-flex align-items-center mx-auto' id='calendario'>Calendario<CgCalendarToday/></button>
                  <button className='solo mx-auto'id='masEventos'>Más Eventos</button>
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

export default Header;