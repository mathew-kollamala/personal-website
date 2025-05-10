import React, { useState, useEffect } from 'react';
import * as atcb from 'add-to-calendar-button';
// Import custom CSS instead of the package CSS
import '../assets/css/atcb-custom.css';

const AppointmentForm = ({ selectedDate, selectedTime }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Purpose options
  const purposeOptions = [
    'General Consultation',
    'Project Discussion',
    'Job Opportunity',
    'Collaboration',
    'Technical Support',
    'Other',
  ];

  // Format date and time for display
  const formatDateTime = () => {
    if (!selectedDate || !selectedTime) return '';

    const date = new Date(selectedDate);
    const [hour, minute] = selectedTime.split(':');
    date.setHours(parseInt(hour), parseInt(minute), 0);

    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setSubmitError('Please select a date and time for your appointment.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // In a real implementation, this would send data to your backend
      // which would then create the event in Google Calendar

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add to calendar functionality
      if (selectedDate && selectedTime) {
        const startDate = new Date(selectedDate);
        const [startHour, startMinute] = selectedTime.split(':');
        startDate.setHours(parseInt(startHour), parseInt(startMinute), 0);

        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1); // 1 hour appointment

        const calendarEvent = {
          name: `Appointment with ${name}`,
          description: `Purpose: ${purpose}\n\nMessage: ${message}`,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          startTime: `${startHour}:${startMinute}`,
          endTime: `${endDate.getHours()}:${endDate.getMinutes()}`,
          location: 'Virtual Meeting',
          options: ['Google', 'Apple', 'Microsoft365', 'Outlook.com', 'Yahoo', 'iCal'],
          timeZone: 'America/Los_Angeles',
          trigger: 'click',
        };

        atcb.atcb_action(calendarEvent);
      }

      setSubmitSuccess(true);

      // Reset form
      setName('');
      setEmail('');
      setPurpose('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setSubmitError('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appointment-form">
      {!submitSuccess ? (
        <form onSubmit={handleSubmit}>
          {selectedDate && selectedTime && (
            <div className="selected-datetime">
              <p>
                Selected Time: <strong>{formatDateTime()}</strong>
              </p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Purpose</label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select a purpose</option>
              {purposeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group message-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
            ></textarea>
          </div>

          {submitError && <div className="error-message">{submitError}</div>}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !selectedDate || !selectedTime}
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Appointment Booked!</h3>
          <p>Your appointment has been successfully scheduled for {formatDateTime()}.</p>
          <p>A confirmation has been sent to your email.</p>
          <p>You can add this appointment to your calendar using the button below.</p>
          <div className="calendar-button-container">
            <button
              className="calendar-btn"
              onClick={() => {
                if (selectedDate && selectedTime) {
                  const startDate = new Date(selectedDate);
                  const [startHour, startMinute] = selectedTime.split(':');
                  startDate.setHours(parseInt(startHour), parseInt(startMinute), 0);

                  const endDate = new Date(startDate);
                  endDate.setHours(endDate.getHours() + 1); // 1 hour appointment

                  const calendarEvent = {
                    name: `Appointment with Mathew George`,
                    description: `Purpose: ${purpose}\n\nMessage: ${message}`,
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    startTime: `${startHour}:${startMinute}`,
                    endTime: `${endDate.getHours()}:${endDate.getMinutes()}`,
                    location: 'Virtual Meeting',
                    options: ['Google', 'Apple', 'Microsoft365', 'Outlook.com', 'Yahoo', 'iCal'],
                    timeZone: 'America/Los_Angeles',
                    trigger: 'click',
                  };

                  atcb.atcb_action(calendarEvent);
                }
              }}
            >
              Add to Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
