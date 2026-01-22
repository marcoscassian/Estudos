# 🏗️ Arquitetura do Projeto

Explicação detalhada da arquitetura, fluxo de dados e organização do código.

---

## 📐 Arquitetura Cliente-Servidor

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Frontend)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          React App (Port 5173)                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │           App.jsx (Componente Raiz)           │  │  │
│  │  │                                                │  │  │
│  │  │  - State Management (React Hooks)             │  │  │
│  │  │  - Controla fluxo de eventos                  │  │  │
│  │  │  - Renderiza componentes filhos               │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                        ↓                              │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │          Componentes (Stateless)              │  │  │
│  │  │                                                │  │  │
│  │  │  - EventForm (Criar/Editar)                   │  │  │
│  │  │  - EventList (Listar com Ações)               │  │  │
│  │  │  - EventFilters (Filtros)                     │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                        ↓                              │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │   eventService.js (Consumo de API)            │  │  │
│  │  │                                                │  │  │
│  │  │  - Axios (HTTP client)                         │  │  │
│  │  │  - Endpoints da API                            │  │  │
│  │  │  - Tratamento de erros                         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                │
│               HTTP Requests (Fetch/Axios)                  │
│                            ↓                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               SERVIDOR (Backend)                            │
│               Flask App (Port 5000)                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Flask Application                       │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │        app.py (Endpoints)                    │   │  │
│  │  │                                              │   │  │
│  │  │  GET    /items          - Listar eventos    │   │  │
│  │  │  POST   /items          - Criar evento      │   │  │
│  │  │  PUT    /items/:id      - Editar evento     │   │  │
│  │  │  PATCH  /items/:id/status - Alterar status  │   │  │
│  │  │  DELETE /items/:id      - Deletar evento    │   │  │
│  │  │  GET    /config         - Configurações     │   │  │
│  │  │                                              │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                        ↓                             │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │     config.py (Configurações)                │   │  │
│  │  │                                              │   │  │
│  │  │  - TIPOS_PERMITIDOS                          │   │  │
│  │  │  - STATUS_PERMITIDOS                         │   │  │
│  │  │  - PORT, DEBUG, etc                          │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                        ↓                             │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  items.json (Persistência de Dados)          │   │  │
│  │  │                                              │   │  │
│  │  │  - Array de eventos                          │   │  │
│  │  │  - Persistência entre reinicializações       │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados

### 1. Carregar Eventos (GET /items)

```
┌──────────────────────────────────┐
│  Usuário abre a página           │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  App.jsx - useEffect (mount)     │
│  Chama: loadEvents()              │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  eventService.getAll(filters)    │
│  Faz requisição GET               │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  app.py - GET /items             │
│  Lê items.json                    │
│  Aplica filtros                   │
│  Retorna JSON                     │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Frontend - setEvents(data)      │
│  Atualiza state                   │
│  Re-renderiza EventList           │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Usuário vê lista de eventos      │
└──────────────────────────────────┘
```

### 2. Criar Evento (POST /items)

```
┌──────────────────────────────────┐
│  Usuário preenche formulário     │
│  Clica "Criar Evento"            │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  EventForm - onSubmit()           │
│  handleFormSubmit(formData)       │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  eventService.create(formData)   │
│  Faz requisição POST              │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  app.py - POST /items            │
│  Valida dados                     │
│  Gera ID                          │
│  Salva em items.json              │
│  Retorna evento criado            │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Frontend - setSuccess()          │
│  setEvents([...novo evento])     │
│  Limpa formulário                 │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Usuário vê:                      │
│  - Mensagem verde de sucesso      │
│  - Evento na lista                │
└──────────────────────────────────┘
```

### 3. Editar Evento (PUT /items/:id)

```
┌──────────────────────────────────┐
│  Usuário clica "Editar"          │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  handleEdit(event)                │
│  setEditingEvent(event)           │
│  Scroll para o formulário         │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  EventForm mostra dados do evento │
│  Usuário altera dados             │
│  Clica "Atualizar"                │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  eventService.update(id, data)   │
│  Faz requisição PUT               │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  app.py - PUT /items/:id         │
│  Encontra evento                  │
│  Atualiza todos os campos         │
│  Salva em items.json              │
│  Retorna evento atualizado        │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Frontend - loadEvents()          │
│  Recarrega lista                  │
│  setEditingEvent(null)            │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Usuário vê:                      │
│  - Mensagem verde de sucesso      │
│  - Formulário limpo               │
│  - Lista atualizada               │
└──────────────────────────────────┘
```

### 4. Alterar Status (PATCH /items/:id/status)

```
┌──────────────────────────────────┐
│  Usuário clica "Concluir"        │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  handleStatusChange(id, status)  │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  eventService.updateStatus()     │
│  Faz requisição PATCH             │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  app.py - PATCH /items/:id/status│
│  Encontra evento                  │
│  Atualiza apenas status           │
│  Salva em items.json              │
│  Retorna evento atualizado        │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Frontend - loadEvents()          │
│  Recarrega lista                  │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Usuário vê:                      │
│  - Status mudou de cor            │
│  - Botão "Concluir" desapareceu   │
└──────────────────────────────────┘
```

### 5. Deletar Evento (DELETE /items/:id)

```
┌──────────────────────────────────┐
│  Usuário clica "Deletar"         │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Aparece diálogo de confirmação  │
│  Usuário confirma                 │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  handleDelete(id)                 │
│  eventService.delete(id)          │
│  Faz requisição DELETE            │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  app.py - DELETE /items/:id      │
│  Encontra evento                  │
│  Remove do array                  │
│  Salva em items.json              │
│  Retorna mensagem de sucesso      │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Frontend - loadEvents()          │
│  Recarrega lista                  │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Usuário vê:                      │
│  - Mensagem verde de sucesso      │
│  - Evento desapareceu da lista    │
└──────────────────────────────────┘
```

---

## 📂 Organização de Arquivos

### Backend
```
backend/
├── app.py              # API REST com todos os endpoints
│                       # - 6 funções de endpoint
│                       # - Funções auxiliares (validação, IO)
│                       # - ~250 linhas
│
├── config.py           # Configurações centralizadas
│                       # - TIPOS_PERMITIDOS
│                       # - STATUS_PERMITIDOS
│                       # - PORT, DEBUG, DATA_FILE
│                       # - ~15 linhas
│
├── requirements.txt    # Dependências Python
│                       # - Flask==3.0.0
│                       # - Flask-CORS==4.0.0
│
└── items.json          # Persistência de dados
                        # - Array de objetos evento
                        # - Criado automaticamente
```

### Frontend
```
frontend/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── EventForm.jsx      # Formulário (criar/editar)
│   │   ├── EventList.jsx      # Lista com ações
│   │   └── EventFilters.jsx   # Filtros
│   │
│   ├── services/       # Lógica de requisições
│   │   └── eventService.js    # Consumo de API (axios)
│   │
│   ├── App.jsx         # Componente raiz
│   │                   # - State management
│   │                   # - Orquestração de componentes
│   │                   # - Ciclo de vida
│   │
│   ├── App.css         # Estilos globais
│   ├── index.css       # Tailwind directives
│   ├── config.js       # Configuração (API_BASE_URL)
│   ├── main.jsx        # Entry point
│   └── assets/         # Recursos estáticos
│
├── package.json        # Dependências Node
├── tailwind.config.js  # Configuração TailwindCSS
├── postcss.config.js   # Configuração PostCSS
├── vite.config.js      # Configuração build tool
├── index.html          # HTML principal
└── .env.example        # Variáveis de ambiente exemplo
```

---

## 🔐 Validação de Dados

### No Backend (app.py)

```python
def validar_evento(dados, editar=False):
    # Titulo
    if 'titulo' not in dados or not dados['titulo']:
        return False, "titulo é obrigatório"
    
    if len(str(dados['titulo']).strip()) < 3:
        return False, "titulo é obrigatório e deve ter..."
    
    # Tipo
    if 'tipo' not in dados or not dados['tipo']:
        return False, "tipo é obrigatório"
    
    if dados['tipo'] not in TIPOS_PERMITIDOS:
        return False, f"tipo deve ser um de: {', '.join(...)}"
    
    # Status
    if 'status' not in dados or not dados['status']:
        return False, "status é obrigatório"
    
    if dados['status'] not in STATUS_PERMITIDOS:
        return False, f"status deve ser um de: {', '.join(...)}"
    
    # Data (opcional)
    if 'data' in dados and dados['data']:
        try:
            datetime.strptime(dados['data'], '%Y-%m-%d')
        except ValueError:
            return False, "data deve estar no formato YYYY-MM-DD"
    
    return True, None
```

### No Frontend (EventForm.jsx)

```javascript
// HTML5 validation
<input type="text" required ... />
<select required ... />
<input type="date" ... />

// Feedback visual
<p className="text-xs text-gray-500">Mínimo 3 caracteres</p>
```

---

## 🎨 Estrutura de Componentes React

### App.jsx (Componente Raiz)

```javascript
App
├── State
│   ├── events (lista de eventos)
│   ├── loading (indicator)
│   ├── error (mensagem)
│   ├── success (mensagem)
│   ├── filters (tipo, status)
│   ├── editingEvent (evento sendo editado)
│   ├── tipos (lista de tipos)
│   └── statusList (lista de status)
│
├── Effects
│   ├── loadConfig() - carregar configurações
│   ├── loadEvents() - carregar eventos (com filtros)
│   └── Limpeza de mensagens (timer)
│
├── Handlers
│   ├── handleFormSubmit() - criar ou editar
│   ├── handleEdit() - carregar evento para editar
│   ├── handleDelete() - remover evento
│   ├── handleStatusChange() - alterar status
│   └── handleFilterChange() - filtrar eventos
│
└── Renderiza
    ├── EventForm (formulário)
    ├── EventFilters (filtros)
    └── EventList (lista)
```

---

## 💾 Fluxo de Persistência

### Como os dados são salvos

```
Usuario cria evento
        ↓
Frontend envia POST /items
        ↓
Backend recebe request
        ↓
Backend valida dados
        ↓
Backend gera novo ID
        ↓
Backend cria objeto evento
        ↓
Backend carrega items.json (lê array existente)
        ↓
Backend adiciona novo evento ao array
        ↓
Backend salva array em items.json (escreve)
        ↓
Backend retorna evento criado
        ↓
Frontend atualiza state
        ↓
Frontend renderiza novo evento
        ↓
Dados persistem (restart do servidor = dados ainda lá!)
```

---

## 🔄 Ciclo de Vida de um Evento

### Estados possíveis

```
CRIADO
   ↓
   └─→ Ativo (padrão)
       │
       ├─→ Concluído (PATCH /status)
       │   └─→ Deletável
       │
       └─→ Cancelado (PATCH /status)
           └─→ Deletável
```

### Renderização condicional

```javascript
// Mostrar "Concluir" apenas se ativo
{event.status !== 'concluido' && event.status !== 'cancelado' && (
    <button>Concluir</button>
)}

// Mostrar "Cancelar" se não cancelado
{event.status !== 'cancelado' && (
    <button>Cancelar</button>
)}
```

---

## 🎯 Design Patterns Utilizados

### 1. Component Composition (React)
- Componentes pequenos e reutilizáveis
- Props para comunicação entre componentes
- Callbacks para ações

### 2. Service Layer (Frontend)
- `eventService.js` encapsula toda lógica de API
- Componentes não conhecem detalhes da requisição HTTP
- Fácil de testar e modificar

### 3. Separation of Concerns (Backend)
- `config.py` para configurações
- `app.py` para lógica de negócio
- `items.json` para dados

### 4. RESTful API (Backend)
- Verbos HTTP corretos (GET, POST, PUT, PATCH, DELETE)
- Recursos representados como nouns (/items)
- Status HTTP apropriados (200, 201, 400, 404)

---

## 📡 Protocolo HTTP

### Estrutura de uma Requisição

```
POST /items HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 123

{
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python",
  "data": "2026-02-01"
}
```

### Estrutura de uma Resposta

```
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 156
CORS headers...

{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python",
  "data": "2026-02-01"
}
```

---

## 🚀 Performance

### Otimizações Implementadas

1. **Frontend**
   - React.memo para componentes se necessário
   - useEffect com dependências corretas
   - Eventos não re-renderizam todos os componentes

2. **Backend**
   - JSON em memória (rápido)
   - Filtros no backend (não transfere dados desnecessários)
   - Validação antes de persistir

### Escalabilidade Futura

Para escalar este projeto:

1. **Substituir JSON por Database** (SQLite, PostgreSQL)
   - Troque `items.json` por ORM (SQLAlchemy)
   - Mesmos endpoints funcionam

2. **Adicionar Autenticação**
   - JWT tokens
   - Middleware de autenticação

3. **Adicionar Paginação**
   - Query params `?page=1&limit=10`
   - Retornar metadados (total, página atual, etc)

4. **Adicionar Busca**
   - Query param `?search=termo`
   - Buscar em título e descrição

---

## 📊 Fluxo de Dados Resumido

```
User ↔ React App ↔ Axios ↔ Flask API ↔ JSON File ↔ Filesystem
 (UI)  (Cliente)   (HTTP)  (Servidor)  (Dados)   (Storage)
```

Cada requisição:
1. Usuário interage com UI
2. React chama eventService
3. Axios faz requisição HTTP
4. Flask processa e valida
5. Flask lê/escreve JSON
6. Resposta volta ao React
7. React atualiza state e UI

---

**Desenvolvido em Janeiro de 2026** 📚✨
