import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const AppointmentCalendar = ({ onDateSelect, onTimeSelect, selectedDate, selectedTime }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [calendarApi, setCalendarApi] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Business hours (9 AM to 5 PM)
  const businessHours = {
    startTime: '09:00',
    endTime: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
  };

  // Generate available time slots for the selected date
  useEffect(() => {
    if (selectedDate) {
      const day = new Date(selectedDate).getDay();
      // Check if the selected day is a weekday (Monday to Friday)
      if (day >= 1 && day <= 5) {
        const times = [];
        // Generate time slots from 9 AM to 5 PM with 30-minute intervals
        for (let hour = 9; hour < 17; hour++) {
          times.push(`${hour}:00`);
          times.push(`${hour}:30`);
        }
        setAvailableTimes(times);
      } else {
        setAvailableTimes([]);
      }
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  // Handle date click
  const handleDateClick = (info) => {
    onDateSelect(info.dateStr);
    onTimeSelect(null); // Reset time selection when date changes
  };

  // Handle calendar ready
  const handleCalendarReady = (calendar) => {
    setCalendarApi(calendar);
  };

  // Handle time slot selection
  const handleTimeSelect = (time) => {
    onTimeSelect(time);
  };

  // Format time for display
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourNum = parseInt(hour);
    return `${hourNum > 12 ? hourNum - 12 : hourNum}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (calendarApi) {
      calendarApi.prev();
      setCurrentMonth(calendarApi.getDate());
    }
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (calendarApi) {
      calendarApi.next();
      setCurrentMonth(calendarApi.getDate());
    }
  };

  return (
    <div className="appointment-calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="month-nav-btn">
          &lt;
        </button>
        <h3>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={handleNextMonth} className="month-nav-btn">
          &gt;
        </button>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          businessHours={businessHours}
          selectable={true}
          dateClick={handleDateClick}
          ref={(el) => el && handleCalendarReady(el.getApi())}
          height={300}
          aspectRatio={1.5}
          fixedWeekCount={false}
          dayMaxEvents={0}
          validRange={{
            start: new Date(), // Disable past dates
          }}
        />
      </div>

      {selectedDate && availableTimes.length > 0 && (
        <div className="time-slots">
          <h4>Available Times for {new Date(selectedDate).toLocaleDateString()}</h4>
          <div className="time-slots-grid">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {formatTime(time)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && availableTimes.length === 0 && (
        <div className="no-times-available">
          <p>No times available on this date. Please select a weekday.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
