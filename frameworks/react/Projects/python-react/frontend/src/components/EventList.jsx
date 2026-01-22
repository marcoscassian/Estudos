export default function EventList({
  events = [],
  loading = false,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="loading">
        <span className="spinner"></span>
        Carregando eventos...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="empty-message">
        <p>Nenhum evento encontrado</p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <div>
      <h2>Eventos</h2>

      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{event.titulo}</h3>
              <span className={`status-badge ${getStatusClass(event.status)}`}>
                {event.status.charAt(0).toUpperCase() +
                  event.status.slice(1)}
              </span>
            </div>

            <div className="event-info">
              <p>
                <strong>Tipo:</strong>{' '}
                {event.tipo.charAt(0).toUpperCase() + event.tipo.slice(1)}
              </p>
              {event.data && (
                <p>
                  <strong>Data:</strong> {event.data}
                </p>
              )}
            </div>

            {event.descricao && (
              <p>
                <strong>Descrição:</strong> {event.descricao}
              </p>
            )}

            <div className="event-actions">
              {event.status !== 'concluido' && event.status !== 'cancelado' && (
                <button
                  onClick={() => onStatusChange(event.id, 'concluido')}
                  className="btn-success"
                >
                  Concluir
                </button>
              )}

              {event.status !== 'cancelado' && (
                <button
                  onClick={() => onStatusChange(event.id, 'cancelado')}
                  className="btn-warning"
                >
                  Cancelar
                </button>
              )}

              <button
                onClick={() => onEdit(event)}
                className="btn-edit"
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(event.id)}
                className="btn-delete"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
