# 📅 Agenda de Eventos

Sistema de gerenciamento de eventos para Ensino Médio Técnico.

## 🚀 Como Rodar

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Porta: http://localhost:5000

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Porta: http://localhost:5173

## 📦 Estrutura

```
python-react/
├── backend/
│   ├── app.py              # API com todos endpoints
│   ├── config.py           # Configurações
│   ├── items.json          # Dados persistidos
│   └── requirements.txt     # Dependências Python
│
└── frontend/
    ├── src/
    │   ├── components/     # EventForm, EventList, EventFilters
    │   ├── services/       # eventService.js
    │   ├── App.jsx
    │   └── config.js
    └── package.json
```

## 🔌 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/items` | Listar eventos (suporta ?tipo=aula&status=ativo) |
| POST | `/items` | Criar evento |
| PUT | `/items/:id` | Editar evento |
| PATCH | `/items/:id/status` | Alterar status |
| DELETE | `/items/:id` | Deletar evento |
| GET | `/config` | Obter configurações |

## 📋 Modelo de Evento

```json
{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Descrição do evento",
  "data": "2026-02-01"
}
```

**Tipos:** aula, prova, reuniao, outro  
**Status:** ativo, concluido, cancelado

## ✅ Validações

- **Título**: obrigatório, mínimo 3 caracteres
- **Tipo**: obrigatório, deve estar na lista permitida
- **Status**: obrigatório, deve estar na lista permitida
- **Data**: formato YYYY-MM-DD (opcional)

## 🎨 Funcionalidades

- ✅ Criar eventos
- ✅ Editar eventos
- ✅ Deletar eventos
- ✅ Filtrar por tipo e status
- ✅ Mudar status (Concluir/Cancelar)
- ✅ Indicador de loading
- ✅ Mensagens de erro/sucesso
- ✅ Interface responsiva (TailwindCSS)

## 🧪 Testar com cURL

```bash
# Criar evento
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Aula","tipo":"aula","status":"ativo"}'

# Listar eventos
curl http://localhost:5000/items

# Listar com filtro
curl "http://localhost:5000/items?tipo=aula&status=ativo"

# Editar evento
curl -X PUT http://localhost:5000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Aula Atualizada","tipo":"aula","status":"ativo"}'

# Mudar status
curl -X PATCH http://localhost:5000/items/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"concluido"}'

# Deletar evento
curl -X DELETE http://localhost:5000/items/1

# Obter configurações
curl http://localhost:5000/config
```

## 📝 Stack

- **Backend**: Flask 3.0.0 + Flask-CORS
- **Frontend**: React 19.2.0 + Vite + TailwindCSS
- **HTTP Client**: Axios
- **Persistência**: JSON

---

**Projeto Técnico - Janeiro 2026** 📚
