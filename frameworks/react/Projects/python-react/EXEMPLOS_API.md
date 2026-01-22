# 🧪 Exemplos de Requisições e Respostas

Guia completo com exemplos de como usar a API de Eventos.

## Índice
- [Criar Evento](#criar-evento)
- [Listar Eventos](#listar-eventos)
- [Filtrar Eventos](#filtrar-eventos)
- [Editar Evento](#editar-evento)
- [Alterar Status](#alterar-status)
- [Deletar Evento](#deletar-evento)
- [Obter Configurações](#obter-configurações)
- [Erros Comuns](#erros-comuns)

---

## ✨ Criar Evento

### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aula de Programação",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Aula de Python - Variáveis",
    "data": "2026-02-01"
  }'
```

### JavaScript/Axios (Frontend)
```javascript
const novoEvento = {
  titulo: "Aula de Programação",
  tipo: "aula",
  status: "ativo",
  descricao: "Aula de Python - Variáveis",
  data: "2026-02-01"
};

axios.post('http://localhost:5000/items', novoEvento)
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (201 Created)
```json
{
  "id": 1,
  "titulo": "Aula de Programação",
  "tipo": "aula",
  "status": "ativo",
  "descricao": "Aula de Python - Variáveis",
  "data": "2026-02-01"
}
```

---

## 📋 Listar Eventos

### Request
```bash
curl http://localhost:5000/items
```

### JavaScript/Axios
```javascript
axios.get('http://localhost:5000/items')
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (200 OK) - Exemplo com 3 eventos
```json
[
  {
    "id": 1,
    "titulo": "Aula de Programação",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Aula de Python - Variáveis",
    "data": "2026-02-01"
  },
  {
    "id": 2,
    "titulo": "Prova de Matemática",
    "tipo": "prova",
    "status": "ativo",
    "descricao": "Prova de Cálculo",
    "data": "2026-02-05"
  },
  {
    "id": 3,
    "titulo": "Reunião com Coordenador",
    "tipo": "reuniao",
    "status": "concluido",
    "descricao": "",
    "data": "2026-01-20"
  }
]
```

---

## 🔍 Filtrar Eventos

### Filtrar por Tipo

#### Request
```bash
curl "http://localhost:5000/items?tipo=aula"
```

#### JavaScript/Axios
```javascript
axios.get('http://localhost:5000/items', {
  params: { tipo: 'aula' }
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

#### Response (200 OK)
```json
[
  {
    "id": 1,
    "titulo": "Aula de Programação",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Aula de Python - Variáveis",
    "data": "2026-02-01"
  }
]
```

---

### Filtrar por Status

#### Request
```bash
curl "http://localhost:5000/items?status=concluido"
```

#### JavaScript/Axios
```javascript
axios.get('http://localhost:5000/items', {
  params: { status: 'concluido' }
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

#### Response (200 OK)
```json
[
  {
    "id": 3,
    "titulo": "Reunião com Coordenador",
    "tipo": "reuniao",
    "status": "concluido",
    "descricao": "",
    "data": "2026-01-20"
  }
]
```

---

### Filtrar por Tipo e Status (combinado)

#### Request
```bash
curl "http://localhost:5000/items?tipo=aula&status=ativo"
```

#### JavaScript/Axios
```javascript
axios.get('http://localhost:5000/items', {
  params: { tipo: 'aula', status: 'ativo' }
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

---

## ✏️ Editar Evento

### Request (editar evento com ID 1)
```bash
curl -X PUT http://localhost:5000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aula de Python Avançado",
    "tipo": "aula",
    "status": "concluido",
    "descricao": "Aula de Python - Funções e Classes",
    "data": "2026-02-10"
  }'
```

### JavaScript/Axios
```javascript
const eventoAtualizado = {
  titulo: "Aula de Python Avançado",
  tipo: "aula",
  status: "concluido",
  descricao: "Aula de Python - Funções e Classes",
  data: "2026-02-10"
};

axios.put('http://localhost:5000/items/1', eventoAtualizado)
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (200 OK)
```json
{
  "id": 1,
  "titulo": "Aula de Python Avançado",
  "tipo": "aula",
  "status": "concluido",
  "descricao": "Aula de Python - Funções e Classes",
  "data": "2026-02-10"
}
```

---

## 🔄 Alterar Status

### Request (alterar status para "concluido")
```bash
curl -X PATCH http://localhost:5000/items/2/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "concluido"
  }'
```

### JavaScript/Axios
```javascript
axios.patch('http://localhost:5000/items/2/status', {
  status: 'concluido'
})
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (200 OK)
```json
{
  "id": 2,
  "titulo": "Prova de Matemática",
  "tipo": "prova",
  "status": "concluido",
  "descricao": "Prova de Cálculo",
  "data": "2026-02-05"
}
```

---

## 🗑️ Deletar Evento

### Request
```bash
curl -X DELETE http://localhost:5000/items/3
```

### JavaScript/Axios
```javascript
axios.delete('http://localhost:5000/items/3')
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (200 OK)
```json
{
  "message": "Evento removido com sucesso"
}
```

---

## ⚙️ Obter Configurações

### Request
```bash
curl http://localhost:5000/config
```

### JavaScript/Axios
```javascript
axios.get('http://localhost:5000/config')
  .then(response => console.log(response.data))
  .catch(error => console.log(error.response.data));
```

### Response (200 OK)
```json
{
  "tipos": ["aula", "prova", "reuniao", "outro"],
  "status": ["ativo", "concluido", "cancelado"]
}
```

---

## ❌ Erros Comuns

### 1. Título Vazio
#### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "",
    "tipo": "aula",
    "status": "ativo"
  }'
```

#### Response (400 Bad Request)
```json
{
  "error": "titulo é obrigatório"
}
```

---

### 2. Título com Menos de 3 Caracteres
#### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "AB",
    "tipo": "aula",
    "status": "ativo"
  }'
```

#### Response (400 Bad Request)
```json
{
  "error": "titulo é obrigatório e deve ter no mínimo 3 caracteres"
}
```

---

### 3. Tipo Inválido
#### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Evento",
    "tipo": "festa",
    "status": "ativo"
  }'
```

#### Response (400 Bad Request)
```json
{
  "error": "tipo deve ser um de: aula, prova, reuniao, outro"
}
```

---

### 4. Status Inválido
#### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Evento",
    "tipo": "aula",
    "status": "pendente"
  }'
```

#### Response (400 Bad Request)
```json
{
  "error": "status deve ser um de: ativo, concluido, cancelado"
}
```

---

### 5. Data em Formato Inválido
#### Request
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Evento",
    "tipo": "aula",
    "status": "ativo",
    "data": "01/02/2026"
  }'
```

#### Response (400 Bad Request)
```json
{
  "error": "data deve estar no formato YYYY-MM-DD"
}
```

---

### 6. Evento Não Encontrado
#### Request
```bash
curl -X PUT http://localhost:5000/items/999 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Teste",
    "tipo": "aula",
    "status": "ativo"
  }'
```

#### Response (404 Not Found)
```json
{
  "error": "Evento não encontrado"
}
```

---

## 📦 Estrutura JSON de um Evento

Todos os eventos seguem esta estrutura:

```json
{
  "id": 1,                                          // número inteiro (gerado automaticamente)
  "titulo": "Nome do Evento",                       // string obrigatória (mín. 3 caracteres)
  "tipo": "aula",                                   // string obrigatória ("aula"|"prova"|"reuniao"|"outro")
  "status": "ativo",                                // string obrigatória ("ativo"|"concluido"|"cancelado")
  "descricao": "Descrição do evento",               // string opcional (pode estar vazia)
  "data": "2026-02-01"                              // string opcional (formato YYYY-MM-DD)
}
```

---

## 🎯 Roteiro de Testes

Siga este roteiro para testar a aplicação completamente:

1. **GET /config** - Obter tipos e status permitidos
2. **POST /items** - Criar 3 eventos diferentes
3. **GET /items** - Listar todos os eventos
4. **GET /items?tipo=aula** - Filtrar por tipo
5. **GET /items?status=ativo** - Filtrar por status
6. **PUT /items/1** - Editar um evento
7. **PATCH /items/2/status** - Alterar status
8. **DELETE /items/3** - Deletar um evento
9. **POST /items** - Tentar criar com dados inválidos (verificar erro)

---

## 💡 Dicas

- Use a ferramenta **Postman** ou **Insomnia** para testar a API de forma visual
- O arquivo `items.json` armazena todos os dados - observe como ele muda com suas requisições
- O CORS está habilitado, então você pode fazer requisições do frontend sem problemas
- Sempre use `Content-Type: application/json` nas requisições

---

Desenvolvido em Janeiro de 2026 📚✨
