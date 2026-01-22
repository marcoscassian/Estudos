# 📂 Estrutura Simplificada do Projeto

## 🔙 Backend

### `app.py` - API Principal
- Contém os **6 endpoints** (GET, POST, PUT, PATCH, DELETE, GET /config)
- Funções para validar dados
- Funções para carregar/salvar dados no JSON
- Função para gerar IDs automáticos

### `config.py` - Configurações
- Lista de **tipos permitidos**: aula, prova, reuniao, outro
- Lista de **status permitidos**: ativo, concluido, cancelado
- Porta do servidor (5000)

### `items.json` - Banco de Dados
- Arquivo que armazena todos os eventos
- Formato: Array de objetos evento
- Persiste mesmo se desligar o servidor

### `requirements.txt` - Dependências
- Flask (framework para API)
- Flask-CORS (permite requisições do frontend)

---

## 🎨 Frontend

### `src/App.jsx` - Componente Principal
- Estado dos eventos, filtros, mensagens
- Funções para criar, editar, deletar, filtrar eventos
- Renderiza os 3 componentes filhos

### Componentes (`src/components/`)

#### `EventForm.jsx` - Formulário
- Campos: Título, Tipo, Status, Descrição, Data
- Cria ou edita um evento
- Envia dados para o backend

#### `EventList.jsx` - Lista de Eventos
- Mostra todos os eventos em cards
- Botões: Editar, Deletar, Concluir, Cancelar
- Loading indicator quando carregando
- Mensagem quando não há eventos

#### `EventFilters.jsx` - Filtros
- Select para filtrar por Tipo
- Select para filtrar por Status
- Botão para limpar filtros

### Serviço (`src/services/`)

#### `eventService.js` - Consumo de API
- Funções que fazem requisições HTTP para o backend
- `getAll()` - GET /items
- `create()` - POST /items
- `update()` - PUT /items/:id
- `updateStatus()` - PATCH /items/:id/status
- `delete()` - DELETE /items/:id
- `getConfig()` - GET /config

### Estilos

#### `index.css` - CSS Puro (Sem TailwindCSS)
- Classes reutilizáveis: `.btn-edit`, `.status-badge`, `.event-card`, etc
- Estilos para form, buttons, cards
- Grid responsivo
- Animações simples

#### `App.css` - Estilos do App
- Estilos globais mínimos

---

## 🚀 Como Tudo Funciona

### 1. **Backend Recebe Requisição**
   - Cliente faz uma requisição HTTP (GET, POST, PUT, etc)
   - Backend valida os dados
   - Backend lê/escreve no `items.json`
   - Backend retorna resposta JSON

### 2. **Frontend Recebe Dados**
   - eventService.js faz requisição via axios
   - App.jsx recebe resposta
   - App.jsx atualiza estado (setEvents, setSuccess, etc)
   - Componentes re-renderizam com novos dados

### 3. **Usuário Vê Resultado**
   - EventList exibe lista atualizada
   - Mensagem de sucesso/erro aparece
   - Indicador de loading some

---

## 📋 Fluxo de Criação de Evento

```
Usuário preenche EventForm
        ↓
EventForm.onSubmit() chamado
        ↓
App.handleFormSubmit() chamado
        ↓
eventService.create(dados)
        ↓
axios.post('/items', dados)
        ↓
Backend recebe em app.py POST /items
        ↓
Valida: titulo, tipo, status
        ↓
Gera novo ID
        ↓
Carrega items.json atual
        ↓
Adiciona novo evento
        ↓
Salva items.json atualizado
        ↓
Retorna evento criado
        ↓
Frontend recebe resposta
        ↓
setSuccess("Evento criado!")
        ↓
loadEvents() atualiza lista
        ↓
EventList re-renderiza com novo evento
```

---

## 🎯 O que REMOVI do Código Original

- ❌ **TailwindCSS** - Deixei CSS Puro mais simples de entender
- ❌ **PostCSS** - Não é necessário sem Tailwind
- ❌ **ESLint** - Configuração automática não necessária para aprender
- ❌ **node_modules (mantém mas não precisa entender)**
- ❌ **Scripts de inicialização automática** - Você roda manualmente
- ❌ **Comentários desnecessários** - Código fica limpo

---

## ✅ O que MANTIVE

- ✅ **React** - Framework para UI
- ✅ **Vite** - Build tool rápido
- ✅ **Axios** - Para fazer requisições HTTP
- ✅ **CSS Puro** - Simples e fácil de entender
- ✅ **Componentes bem organizados**
- ✅ **Lógica clara sem abstrações desnecessárias**

---

## 📚 Para Entender Cada Parte

1. **CSS**: Abra `src/index.css` - veja as classes
2. **HTML/React**: Abra os componentes em `src/components/`
3. **API**: Abra `backend/app.py` - veja os endpoints
4. **Lógica Principal**: Abra `src/App.jsx` - veja o fluxo

Tudo está comentado para você aprender!

---

**Tudo simples, sem mistério.** 📚✨
