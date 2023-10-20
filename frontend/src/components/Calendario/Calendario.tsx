// Calendario.tsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarioProps {
  onDateChange: (date: Date) => void;
}

const Calendario: React.FC<CalendarioProps> = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default Calendario;
