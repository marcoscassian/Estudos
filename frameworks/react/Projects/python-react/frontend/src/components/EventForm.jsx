import { useState } from 'react';

export default function EventForm({
  initialData = null,
  tipos = [],
  statusList = [],
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      titulo: '',
      tipo: '',
      status: '',
      descricao: '',
      data: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editar Evento' : 'Novo Evento'}</h2>

      <div className="form-grid">
        {/* Título */}
        <div>
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Nome do evento"
            required
          />
          <small>Mínimo 3 caracteres</small>
        </div>

        {/* Tipo */}
        <div>
          <label>Tipo *</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um status</option>
            {statusList.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label>Data</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {initialData ? 'Atualizar' : 'Criar Evento'}
      </button>
    </form>
  );
}
