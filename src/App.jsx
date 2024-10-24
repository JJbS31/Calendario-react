import { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "./App.css";

function App() {
  const localizer = dayjsLocalizer(dayjs);

  // Inicializa el estado de eventos como un arreglo vacío
  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleAddEvent = () => {
    const { title, start, end } = newEvent;
    if (title && start && end) {
      setEvents([
        ...events,
        {
          title,
          start: new Date(start),
          end: new Date(end),
        },
      ]);
      setNewEvent({ title: '', start: '', end: '' }); // Limpiar el formulario después de agregar
    } else {
      alert("Por favor completa todos los campos del evento");
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el evento "${eventToDelete.title}"?`)) {
      setEvents(events.filter((event) => event !== eventToDelete));
    }
  };

  return (
    <div>
      <h2>Calendario con Recordatorios</h2>

      <div>
        <input
          type="text"
          placeholder="Título del evento"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Inicio del evento"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Fin del evento"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
        />
        <button onClick={handleAddEvent}>Agregar Recordatorio</button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 500, weight: 500 }}
        onSelectEvent={handleDeleteEvent}
      />
    </div>
  );
}

export default App;
