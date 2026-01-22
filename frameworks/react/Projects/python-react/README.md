# 📅 Sistema de Agenda de Eventos

Mini-sistema de registros para um projeto de Ensino Médio Técnico, permitindo cadastrar, editar, listar, filtrar e remover eventos.

## 🎯 Características

- ✅ Criar novos eventos
- ✅ Editar eventos existentes
- ✅ Remover eventos
- ✅ Filtrar por tipo e status
- ✅ Mudar status de eventos
- ✅ Persistência de dados em arquivo JSON
- ✅ Interface responsiva com TailwindCSS
- ✅ Indicadores de loading e mensagens de erro/sucesso

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Flask 3.0.0
- **CORS**: Flask-CORS 4.0.0
- **Persistência**: JSON (arquivo)
- **Porta**: 5000

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 3.4.1
- **HTTP Client**: Axios 1.6.0
- **Porta**: 5173 (padrão Vite)

## 📦 Estrutura do Projeto

```
python-react/
├── backend/
│   ├── app.py                 # API principal com todos os endpoints
│   ├── config.py              # Configurações (tipos, status, etc)
│   ├── items.json             # Arquivo de persistência de dados
│   └── requirements.txt        # Dependências Python
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EventForm.jsx        # Formulário de criar/editar eventos
    │   │   ├── EventList.jsx        # Lista de eventos com ações
    │   │   └── EventFilters.jsx     # Componente de filtros
    │   ├── services/
    │   │   └── eventService.js      # Serviço de consumo da API
    │   ├── App.jsx                  # Componente principal
    │   ├── App.css                  # Estilos globais
    │   ├── index.css                # Tailwind directives
    │   ├── config.js                # Configurações do frontend
    │   └── main.jsx                 # Ponto de entrada
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── index.html
```

## 🚀 Como Rodar o Projeto

### ⚙️ Configuração Inicial

#### 1. Backend (Flask)

```bash
# Navegar até a pasta do backend
cd backend

# Instalar dependências (se não estiverem instaladas)
pip install -r requirements.txt

# Rodar o servidor
python app.py
```

O backend estará disponível em: **http://localhost:5000**

#### 2. Frontend (React)

```bash
# Navegar até a pasta do frontend (em outro terminal)
cd frontend

# Instalar dependências (primeira vez)
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

### ✅ Verificar se está tudo funcionando

- Abra [http://localhost:5173](http://localhost:5173) no navegador
- Você verá o formulário de criar eventos e a lista vazia
- Tente criar um novo evento

## 📝 Modelo de Dados

### Entidade: Item (Evento)

Estrutura de um evento no sistema:

```json
{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python - Variáveis e Tipos",
  "data": "2026-02-01"
}
```

### Campos Obrigatórios
- **id** (number): Identificador único, gerado automaticamente pelo backend
- **titulo** (string): Nome do evento, mínimo 3 caracteres
- **tipo** (string): Categoria do evento
- **status** (string): Situação atual do evento

### Campos Opcionais
- **descricao** (string): Detalhes do evento
- **data** (string): Data no formato YYYY-MM-DD

## 🔌 Endpoints da API

### GET /items
Lista todos os eventos com suporte a filtros

**Query Parameters:**
- `tipo` (opcional): Filtrar por tipo
- `status` (opcional): Filtrar por status

**Exemplo:**
```bash
curl http://localhost:5000/items
curl http://localhost:5000/items?tipo=aula
curl http://localhost:5000/items?status=ativo
curl http://localhost:5000/items?tipo=aula&status=ativo
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "titulo": "Aula de Programação",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Aula de Python",
    "data": "2026-02-01"
  }
]
```

---

### POST /items
Criar um novo evento

**Body (JSON):**
```json
{
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python",
  "data": "2026-02-01"
}
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python",
  "data": "2026-02-01"
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "error": "titulo é obrigatório e deve ter no mínimo 3 caracteres"
}
```

---

### PUT /items/:id
Editar completamente um evento

**Body (JSON):**
```json
{
  "titulo": "Aula de Python Atualizada",
  "tipo": "aula",
  "status": "concluido",
  "descricao": "Conteúdo atualizado",
  "data": "2026-02-05"
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "titulo": "Aula de Python Atualizada",
  "tipo": "aula",
  "status": "concluido",
  "descricao": "Conteúdo atualizado",
  "data": "2026-02-05"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Evento não encontrado"
}
```

---

### PATCH /items/:id/status
Alterar apenas o status de um evento

**Body (JSON):**
```json
{
  "status": "concluido"
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "concluido",
  "descricao": "Aula de Python",
  "data": "2026-02-01"
}
```

---

### DELETE /items/:id
Remover um evento

**Resposta (200 OK):**
```json
{
  "message": "Evento removido com sucesso"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "error": "Evento não encontrado"
}
```

---

### GET /config
Obter as configurações do sistema (tipos e status permitidos)

**Resposta (200 OK):**
```json
{
  "tipos": ["aula", "prova", "reuniao", "outro"],
  "status": ["ativo", "concluido", "cancelado"]
}
```

## ✅ Regras de Validação

### Título
- ✓ Obrigatório
- ✓ Mínimo de 3 caracteres
- **Erro**: `"titulo é obrigatório e deve ter no mínimo 3 caracteres"`

### Tipo
- ✓ Obrigatório
- ✓ Valores permitidos: `["aula", "prova", "reuniao", "outro"]`
- **Erro**: `"tipo deve ser um de: aula, prova, reuniao, outro"`

### Status
- ✓ Obrigatório
- ✓ Valores permitidos: `["ativo", "concluido", "cancelado"]`
- **Erro**: `"status deve ser um de: ativo, concluido, cancelado"`

### Data (opcional)
- ✓ Formato: YYYY-MM-DD
- **Erro**: `"data deve estar no formato YYYY-MM-DD"`

## 🎨 Interface do Usuário

### Tela Principal

A aplicação contém uma única tela com:

1. **Header** - Título e descrição do sistema
2. **Mensagens de Feedback** - Sucesso (verde) ou Erro (vermelho)
3. **Formulário** - Para criar ou editar eventos
4. **Filtros** - Por tipo e status
5. **Lista de Eventos** - Cards com ações de editar, deletar, mudar status
6. **Footer** - Informações do projeto

### Funcionalidades Principais

- 🎯 **Criar Evento**: Preencha o formulário e clique em "Criar Evento"
- ✏️ **Editar Evento**: Clique em "Editar" no card do evento
- 🗑️ **Deletar Evento**: Clique em "Deletar" (com confirmação)
- ✅ **Concluir Evento**: Clique em "Concluir" para marcar como concluído
- ❌ **Cancelar Evento**: Clique em "Cancelar" para marcar como cancelado
- 🔍 **Filtrar**: Use os filtros de tipo e status

### Indicadores Visuais

- **Loading**: Spinner durante requisições
- **Cores de Status**: 
  - 🟢 Verde: Ativo
  - 🔵 Azul: Concluído
  - 🔴 Vermelho: Cancelado
- **Cores de Tipo**:
  - 🔵 Indigo: Aula
  - 🟠 Orange: Prova
  - 🟣 Purple: Reunião
  - ⚫ Gray: Outro

## 🧪 Testando a API com cURL

### 1. Criar um novo evento
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aula de Programação",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Aula de Python",
    "data": "2026-02-01"
  }'
```

### 2. Listar todos os eventos
```bash
curl http://localhost:5000/items
```

### 3. Listar eventos filtrados
```bash
curl "http://localhost:5000/items?tipo=aula&status=ativo"
```

### 4. Editar um evento (substitua 1 pelo ID)
```bash
curl -X PUT http://localhost:5000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aula de Python Avançado",
    "tipo": "aula",
    "status": "concluido",
    "descricao": "Aula atualizada",
    "data": "2026-02-05"
  }'
```

### 5. Alterar apenas o status
```bash
curl -X PATCH http://localhost:5000/items/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "concluido"
  }'
```

### 6. Deletar um evento
```bash
curl -X DELETE http://localhost:5000/items/1
```

### 7. Obter configurações
```bash
curl http://localhost:5000/config
```

## 📋 Checklist de Requisitos

- ✅ Criação de eventos (POST)
- ✅ Leitura de eventos (GET)
- ✅ Atualização de eventos (PUT)
- ✅ Alteração de status (PATCH)
- ✅ Remoção de eventos (DELETE)
- ✅ Filtros por tipo e status
- ✅ Validação de campos obrigatórios
- ✅ Validação de comprimento mínimo (título)
- ✅ Validação de valores permitidos (tipo, status)
- ✅ Persistência em arquivo JSON
- ✅ CORS configurado
- ✅ Interface com TailwindCSS
- ✅ Indicador de loading
- ✅ Mensagens de erro e sucesso
- ✅ Uma única entidade (Evento)
- ✅ Sem login
- ✅ Sem relacionamentos

## 📸 Screenshots Esperados

1. **Tela Inicial** - Formulário vazio e lista vazia
2. **Criar Evento** - Preenchendo o formulário
3. **Lista de Eventos** - Exibindo eventos criados
4. **Filtros** - Filtrando por tipo/status
5. **Edição** - Editando um evento existente
6. **Feedback** - Mensagens de sucesso/erro

## ⚠️ Observações Importantes

- A porta do backend é **5000** e do frontend é **5173**
- O CORS está configurado para aceitar requisições do frontend
- Os dados são persistidos em **`backend/items.json`**
- O IDs são gerados automaticamente de forma sequencial
- A data deve estar em formato ISO (YYYY-MM-DD)

## 🔄 Fluxo Típico de Uso

1. Abrir o navegador em `http://localhost:5173`
2. Preencher o formulário com dados do evento
3. Clicar em "Criar Evento"
4. Ver a mensagem de sucesso
5. Evento aparece na lista abaixo
6. Usar filtros para buscar eventos
7. Clicar em "Editar" para modificar
8. Clicar em "Concluir" ou "Cancelar" para alterar status
9. Clicar em "Deletar" para remover

## 🎓 Propósito Educacional

Este projeto foi desenvolvido para fins educacionais em um curso de Ensino Médio Técnico, demonstrando:

- Arquitetura Cliente-Servidor
- REST API com Flask
- Consumo de API com React
- Validação de dados
- Persistência de dados
- UI responsiva com CSS Framework
- Boas práticas de organização de código

---

**Desenvolvido em Janeiro de 2026** 📚✨
