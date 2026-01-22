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
    <div className="filters">
      <h3>Filtros</h3>

      <div className="form-grid">
        {/* Filtro por Tipo */}
        <div>
          <label>Tipo</label>
          <select value={filters.tipo || ''} onChange={handleTypeChange}>
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
          <label>Status</label>
          <select value={filters.status || ''} onChange={handleStatusChange}>
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
        <button onClick={handleClearFilters} style={{ marginTop: '10px' }}>
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
