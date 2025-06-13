import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/_calendar.scss";
import { BsXLg } from "react-icons/bs";

const Calendar = () => {
  const [isSelectedDatePanelOpen, setIsSelectedDatePanelOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({
    // Sample events for demonstration
    "2024-01-15": [
      {
        id: 1,
        title: "Team Meeting",
        startTime: "10:00",
        endTime: "11:00",
        priority: "high",
      },
    ],
    "2024-01-20": [
      {
        id: 2,
        title: "Project Deadline",
        startTime: "17:00",
        endTime: "18:00",
        priority: "high",
      },
    ],
    "2024-01-25": [
      {
        id: 3,
        title: "Client Call",
        startTime: "14:00",
        endTime: "15:00",
        priority: "medium",
      },
      {
        id: 4,
        title: "Code Review",
        startTime: "16:00",
        endTime: "17:30",
        priority: "low",
      },
    ],
  });
  const [selectedDate, setSelectedDate] = useState(null);

  // This for notes temporary
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables",
    },
    { id: 2, title: "Ideas", content: "New feature concepts for next sprint" },
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("");
  const [newEventPriority, setNewEventPriority] = useState("medium");
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const priorityDropdownRef = useRef(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);

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

  // Close priority dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(event.target)
      ) {
        setIsPriorityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Priority colors
  const priorityColors = {
    high: "#ea4335", // Red
    medium: "#fbbc04", // Yellow
    low: "#34a853", // Green
  };

  // Priority options for dropdown
  const priorityOptions = [
    { value: "high", label: "High Priority", color: "#ea4335" },
    { value: "medium", label: "Medium Priority", color: "#fbbc04" },
    { value: "low", label: "Low Priority", color: "#34a853" },
  ];

  // Helper function to format time for display
  const formatTimeForDisplay = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

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
    setIsAddingEvent(false);
    setNewEventTitle("");
    setNewEventStartTime("");
    setNewEventEndTime("");
    setNewEventPriority("medium");
  };

  const addEvent = () => {
    if (
      !selectedDate ||
      !newEventTitle.trim() ||
      !newEventStartTime.trim() ||
      !newEventEndTime.trim()
    )
      return;

    const dateKey = formatDateKey(selectedDate);
    const newEvent = {
      id: Date.now(),
      title: newEventTitle.trim(),
      startTime: newEventStartTime.trim(),
      endTime: newEventEndTime.trim(),
      priority: newEventPriority,
    };

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));

    setNewEventTitle("");
    setNewEventStartTime("");
    setNewEventEndTime("");
    setNewEventPriority("medium");
    setIsAddingEvent(false);
  };

  const removeEvent = (eventId, date) => {
    const dateKey = formatDateKey(date);
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
    }));
  };

  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
    };

    setNotes((prev) => [...prev, newNote]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  const updateNote = (noteId, title, content) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, title: title.trim(), content: content.trim() }
          : note
      )
    );
    setEditingNote(null);
  };

  const removeNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const renderMiniCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();

    const miniCalendarDays = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      miniCalendarDays.push(
        <div key={`mini-empty-${i}`} className="mini-calendar-day empty"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const hasEvents = getEventsForDate(date).length > 0;

      miniCalendarDays.push(
        <div
          key={day}
          className={`mini-calendar-day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          } ${hasEvents ? "has-events" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="mini-calendar">
        <div className="mini-calendar-header">
          <button onClick={() => navigateMonth(-1)} className="mini-nav-button">
            ←
          </button>
          <h4>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
          <button onClick={() => navigateMonth(1)} className="mini-nav-button">
            →
          </button>
        </div>
        <div className="mini-calendar-weekdays">
          {daysOfWeek.map((day) => (
            <div key={day} className="mini-weekday">
              {day.substring(0, 1)}
            </div>
          ))}
        </div>
        <div className="mini-calendar-grid">{miniCalendarDays}</div>
      </div>
    );
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
                style={{ backgroundColor: priorityColors[event.priority] }}
                title={`${event.title} - ${formatTimeForDisplay(
                  event.startTime
                )} to ${formatTimeForDisplay(event.endTime)}`}
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

        {/* Mini Calendar */}
        {renderMiniCalendar()}

        {/* Events Section */}
        <div className="events-section">
          <h4>Events</h4>
          {dayEvents.length === 0 ? (
            <p>No events scheduled</p>
          ) : (
            <div className="events-list">
              {dayEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div
                    className="event-priority-indicator"
                    style={{ backgroundColor: priorityColors[event.priority] }}
                  ></div>
                  <div className="event-details">
                    <span className="event-title">{event.title}</span>
                    <span className="event-time">
                      {formatTimeForDisplay(event.startTime)} -{" "}
                      {formatTimeForDisplay(event.endTime)}
                    </span>
                    <span className="event-priority">
                      Priority:{" "}
                      {event.priority.charAt(0).toUpperCase() +
                        event.priority.slice(1)}
                    </span>
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

          {/* Add Event Form */}
          {isAddingEvent ? (
            <div className="add-event-form">
              <input
                type="text"
                placeholder="Event title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="event-input"
              />
              <div className="time-inputs">
                <div className="time-input-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="event-time-input"
                  />
                </div>
                <div className="time-input-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    value={newEventEndTime}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                    className="event-time-input"
                  />
                </div>
              </div>
              <div className="priority-selection">
                <label>Priority</label>
                <div
                  className="custom-priority-dropdown"
                  ref={priorityDropdownRef}
                >
                  <div
                    className="priority-dropdown-trigger"
                    onClick={() =>
                      setIsPriorityDropdownOpen(!isPriorityDropdownOpen)
                    }
                  >
                    <div className="selected-priority">
                      <div
                        className="priority-color-dot"
                        style={{
                          backgroundColor: priorityColors[newEventPriority],
                        }}
                      ></div>
                      {
                        priorityOptions.find(
                          (option) => option.value === newEventPriority
                        )?.label
                      }
                    </div>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  {isPriorityDropdownOpen && (
                    <div className="priority-dropdown-options">
                      {priorityOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`priority-option ${
                            newEventPriority === option.value ? "selected" : ""
                          }`}
                          onClick={() => {
                            setNewEventPriority(option.value);
                            setIsPriorityDropdownOpen(false);
                          }}
                        >
                          <div
                            className="priority-color-dot"
                            style={{ backgroundColor: option.color }}
                          ></div>
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-buttons">
                <button onClick={addEvent} className="add-event-btn">
                  Add Event
                </button>
                <button
                  onClick={() => {
                    setIsAddingEvent(false);
                    setNewEventTitle("");
                    setNewEventStartTime("");
                    setNewEventEndTime("");
                    setNewEventPriority("medium");
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingEvent(true)}
              className="add-event-btn"
            >
              Add Event
            </button>
          )}
        </div>
      </section>
    );
  };

  const renderNotesSection = () => {
    return (
      <section className="notes-panel">
        <div className="notes-header">
          <h3>Notes</h3>
        </div>

        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              {editingNote === note.id ? (
                <div className="edit-note-form">
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) =>
                      setNotes((prev) =>
                        prev.map((n) =>
                          n.id === note.id ? { ...n, title: e.target.value } : n
                        )
                      )
                    }
                    className="note-input"
                  />
                  <textarea
                    value={note.content}
                    onChange={(e) =>
                      setNotes((prev) =>
                        prev.map((n) =>
                          n.id === note.id
                            ? { ...n, content: e.target.value }
                            : n
                        )
                      )
                    }
                    className="note-textarea"
                    rows="3"
                  />
                  <div className="form-buttons">
                    <button
                      onClick={() =>
                        updateNote(note.id, note.title, note.content)
                      }
                      className="save-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNote(null)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="note-content">
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                  </div>
                  <div className="note-actions">
                    <button
                      onClick={() => setEditingNote(note.id)}
                      className="edit-note-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeNote(note.id)}
                      className="remove-note-btn"
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Note Form */}
        {isAddingNote ? (
          <div className="add-note-form">
            <input
              type="text"
              placeholder="Note title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="note-input"
            />
            <textarea
              placeholder="Note content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="note-textarea"
              rows="3"
            />
            <div className="form-buttons">
              <button onClick={addNote} className="add-note-btn">
                Add Note
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNoteTitle("");
                  setNewNoteContent("");
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingNote(true)}
            className="add-note-btn"
          >
            Add Note
          </button>
        )}
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

        <div className="right-panels">
          {isSelectedDatePanelOpen && (
            <div className="sidebar">{renderSelectedDateEvents()}</div>
          )}
          {renderNotesSection()}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
