import { useState, useEffect } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventFilters from './components/EventFilters';
import eventService from './services/eventService';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filters, setFilters] = useState({ tipo: '', status: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [statusList, setStatusList] = useState([]);

  // Carregar configurações e eventos ao montar o componente
  useEffect(() => {
    loadConfig();
    loadEvents();
  }, []);

  // Recarregar eventos quando filtros mudam
  useEffect(() => {
    loadEvents();
  }, [filters]);

  // Limpar mensagens de sucesso/erro após 3 segundos
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const loadConfig = async () => {
    const result = await eventService.getConfig();
    if (result.success) {
      setTipos(result.data.tipos);
      setStatusList(result.data.status);
    } else {
      setError(result.error);
    }
  };

  const loadEvents = async () => {
    setLoading(true);
    const result = await eventService.getAll(filters);
    if (result.success) {
      setEvents(result.data);
      setError('');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    let result;

    if (editingEvent) {
      // Atualizar evento existente
      result = await eventService.update(editingEvent.id, formData);
      if (result.success) {
        setSuccess('Evento atualizado com sucesso!');
        setEditingEvent(null);
      } else {
        setError(result.error);
      }
    } else {
      // Criar novo evento
      result = await eventService.create(formData);
      if (result.success) {
        setSuccess('Evento cadastrado com sucesso!');
      } else {
        setError(result.error);
      }
    }

    setLoading(false);
    if (result.success) {
      loadEvents();
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
      setLoading(true);
      const result = await eventService.delete(id);
      if (result.success) {
        setSuccess('Evento removido com sucesso!');
        loadEvents();
      } else {
        setError(result.error);
      }
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    const result = await eventService.updateStatus(id, newStatus);
    if (result.success) {
      setSuccess('Status atualizado com sucesso!');
      loadEvents();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1>📅 Agenda de Eventos</h1>
        <p>Sistema de gerenciamento de eventos</p>
      </header>

      {/* Container Principal */}
      <main>
        {/* Mensagens de Sucesso */}
        {success && (
          <div className="success-message">
            ✅ {success}
          </div>
        )}

        {/* Mensagens de Erro */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Formulário */}
        <EventForm
          initialData={editingEvent}
          tipos={tipos}
          statusList={statusList}
          onSubmit={handleFormSubmit}
          loading={loading}
        />

        {editingEvent && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={handleCancelEdit}>
              Cancelar Edição
            </button>
          </div>
        )}

        {/* Filtros */}
        <EventFilters
          tipos={tipos}
          statusList={statusList}
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Lista de Eventos */}
        <EventList
          events={events}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Footer */}
      <footer>
        <p>© 2026 Sistema de Agenda de Eventos - Projeto Técnico</p>
      </footer>
    </div>
  );
}

export default App;
