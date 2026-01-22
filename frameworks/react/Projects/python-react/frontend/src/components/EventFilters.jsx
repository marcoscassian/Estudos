/**
 * Componente de Filtros para eventos
 * @param {Object} props - Props do componente
 * @param {Array} props.tipos - Lista de tipos permitidos
 * @param {Array} props.statusList - Lista de status permitidos
 * @param {Object} props.filters - Filtros atuais
 * @param {Function} props.onFilterChange - Função chamada quando filtro muda
 */
export default function EventFilters({
  tipos = [],
  statusList = [],
  filters = {},
  onFilterChange,
}) {
  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, tipo: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ tipo: '', status: '' });
  };

  const hasActiveFilters = filters.tipo || filters.status;

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filtros</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro por Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            value={filters.tipo || ''}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os status</option>
            {statusList.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão Limpar Filtros */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
