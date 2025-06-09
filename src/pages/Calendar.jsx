import React, { useState } from "react";
import "../styles/pages/_calendar.scss";
import { BsXLg } from "react-icons/bs";

const Calendar = () => {
  const [isSelectedDatePanelOpen, setIsSelectedDatePanelOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({
    // Sample events for demonstration
    "2024-01-15": [{ id: 1, title: "Team Meeting", time: "10:00 AM" }],
    "2024-01-20": [{ id: 2, title: "Project Deadline", time: "5:00 PM" }],
    "2024-01-25": [
      { id: 3, title: "Client Call", time: "2:00 PM" },
      { id: 4, title: "Code Review", time: "4:00 PM" },
    ],
  });
  const [selectedDate, setSelectedDate] = useState(null);

  // Calendar helper functions
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return events[dateKey] || [];
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsSelectedDatePanelOpen(true);
  };

  const addEvent = () => {
    if (!selectedDate) return;

    const eventTitle = prompt("Enter event title:");
    const eventTime = prompt("Enter event time (e.g., 10:00 AM):");

    if (eventTitle && eventTime) {
      const dateKey = formatDateKey(selectedDate);
      const newEvent = {
        id: Date.now(),
        title: eventTitle,
        time: eventTime,
      };

      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent],
      }));
    }
  };

  const removeEvent = (eventId, date) => {
    const dateKey = formatDateKey(date);
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
    }));
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();

    const calendarDays = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => handleDateClick(date)}
        >
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="event-dot"
                title={`${event.title} - ${event.time}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="more-events">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const dayEvents = getEventsForDate(selectedDate);
    const dateString = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // This part is for panel or modal for selected date
    return (
      <section className="selected-date-panel">
        <div className="selected-date-panel-header">
          <h3>{dateString}</h3>
          <button
            className="selected-date-panel-header-button"
            onClick={() => setIsSelectedDatePanelOpen(false)}
          >
            <BsXLg size={20} />
          </button>
        </div>
        {dayEvents.length === 0 ? (
          <p>No events scheduled</p>
        ) : (
          <div className="events-list">
            {dayEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-details">
                  <span className="event-title">{event.title}</span>
                  <span className="event-time">{event.time}</span>
                </div>
                <button
                  onClick={() => removeEvent(event.id, selectedDate)}
                  className="remove-event"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button onClick={addEvent} className="add-event-btn">
          Add Event
        </button>
      </section>
    );
  };

  return (
    <section className="calendar-container">
      <header className="calendar-header">
        <h1>Calendar</h1>
        <div className="calendar-controls">
          <button onClick={() => navigateMonth(-1)} className="nav-button">
            ← Previous
          </button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => navigateMonth(1)} className="nav-button">
            Next →
          </button>
        </div>
        <button onClick={goToToday} className="today-button">
          Today
        </button>
      </header>

      <div className="calendar-content">
        <div className="calendar-grid-section">
          <div className="calendar-weekdays">
            {daysOfWeek.map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">{renderCalendarGrid()}</div>
        </div>

        {isSelectedDatePanelOpen && (
          <div className="sidebar">{renderSelectedDateEvents()}</div>
        )}
      </div>
    </section>
  );
};

export default Calendar;
