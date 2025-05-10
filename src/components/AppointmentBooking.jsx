import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import AppointmentForm from './AppointmentForm';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="appointment-booking">
      <div className="appointment-container">
        <div className="appointment-calendar-section">
          <h2>Select Date & Time</h2>
          <AppointmentCalendar
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>

        <div className="appointment-form-section">
          <h2>Your Information</h2>
          <AppointmentForm selectedDate={selectedDate} selectedTime={selectedTime} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
