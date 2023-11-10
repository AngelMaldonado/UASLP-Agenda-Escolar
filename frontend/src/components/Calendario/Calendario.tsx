// Calendar.tsx
import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Calendario: React.FC = () => {
  // Punto 1: Configurar un estado para gestionar los eventos
  const [events, setEvents] = useState([
    {title: 'Evento 1', date: '2023-10-05'},
    {
      firstDay: 1
    }
    // Otros eventos iniciales
  ]);

  // Punto 2: Configurar una forma para crear eventos
  const [newEvent, setNewEvent] = useState({title: '', date: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewEvent({...newEvent, [name]: value});
  };

  const addEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({title: '', date: ''});
  };

  // Punto 3: Configurar el componente FullCalendar
  return (
    <div className="calendar-container">
      <div>
        {/* <input
          type="text"
          name="title"
          placeholder="Título del evento"
          value={newEvent.title}
          onChange={handleInputChange}
        /> */}
        {/* <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <button onClick={addEvent}>Agregar Evento</button> */}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale='es-ES'
        firstDay={1}

        // Resto de las propiedades del calendario...
      />

    </div>
  );
};

export default Calendario;
