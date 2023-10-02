import './App.css'
import React, { useState } from 'react';
import Navbar from "../Navbar";
import Usuarios from "../Usuarios/Usuarios.tsx";
import Calendario from '../Calendario/Calendario.tsx';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    console.log('Fecha seleccionada:', date);
    // Aquí puedes realizar acciones adicionales con la fecha seleccionada
    setSelectedDate(date);
  };


  return (
    <>
      <Navbar/>
      <div className="BarraFiltro"></div>
      <div className="BarraAdmin"></div>
      <Calendario onDateChange={handleDateChange} />
      <Usuarios />
      
      
      
      

      

    </>
  )
}
export default App;
