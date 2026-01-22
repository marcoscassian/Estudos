/**
 * Componente de Lista de Eventos
 * @param {Object} props - Props do componente
 * @param {Array} props.events - Lista de eventos a exibir
 * @param {boolean} props.loading - Indica se está carregando
 * @param {Function} props.onEdit - Função chamada ao clicar em editar
 * @param {Function} props.onDelete - Função chamada ao clicar em deletar
 * @param {Function} props.onStatusChange - Função chamada ao mudar status
 */
export default function EventList({
  events = [],
  loading = false,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Carregando eventos...</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500 text-lg">Nenhum evento encontrado</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      ativo: 'bg-green-100 text-green-800',
      concluido: 'bg-blue-100 text-blue-800',
      cancelado: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (tipo) => {
    const colors = {
      aula: 'bg-indigo-50 border-l-4 border-indigo-500',
      prova: 'bg-orange-50 border-l-4 border-orange-500',
      reuniao: 'bg-purple-50 border-l-4 border-purple-500',
      outro: 'bg-gray-50 border-l-4 border-gray-500',
    };
    return colors[tipo] || 'bg-gray-50 border-l-4 border-gray-500';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Eventos</h2>

      {events.map((event) => (
        <div
          key={event.id}
          className={`p-4 rounded-lg shadow-sm hover:shadow-md transition ${getTypeColor(
            event.tipo
          )}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Informações do Evento */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {event.titulo}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status.charAt(0).toUpperCase() +
                    event.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
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
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Descrição:</strong> {event.descricao}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:ml-4">
              {event.status !== 'concluido' && event.status !== 'cancelado' && (
                <button
                  onClick={() => onStatusChange(event.id, 'concluido')}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                >
                  Concluir
                </button>
              )}

              {event.status !== 'cancelado' && (
                <button
                  onClick={() => onStatusChange(event.id, 'cancelado')}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition"
                >
                  Cancelar
                </button>
              )}

              <button
                onClick={() => onEdit(event)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
