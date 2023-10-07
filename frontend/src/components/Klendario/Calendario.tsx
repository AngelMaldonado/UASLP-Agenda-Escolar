// Calendar.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Calendar: React.FC = () => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Evento 1', date: '2023-10-05' },
          // Agrega más eventos según sea necesario
        ]}
      />
    </div>
  );
};

export default Calendar;
