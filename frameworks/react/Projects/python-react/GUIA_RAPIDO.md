# 🚀 Guia Rápido de Instalação e Execução

Siga este guia passo-a-passo para colocar o projeto rodando em minutos!

## ⚡ Instalação Rápida (5 minutos)

### Pré-requisitos
- Python 3.8+ instalado
- Node.js 16+ e npm instalados
- Um editor de código (VS Code recomendado)

### Passo 1: Instalar Dependências do Backend

```bash
# Abra um terminal e navegue até a pasta backend
cd backend

# Instale as dependências Python
pip install -r requirements.txt
```

**Esperado:** Sem erros de instalação

---

### Passo 2: Instalar Dependências do Frontend

```bash
# Abra OUTRO terminal e navegue até a pasta frontend
cd frontend

# Instale as dependências Node
npm install
```

**Esperado:** Finaliza com "added X packages"

---

## 🏃 Executar o Projeto

### Terminal 1 - Iniciar Backend

```bash
cd backend
python app.py
```

**Esperado:**
```
🚀 Servidor iniciado em http://localhost:5000
📁 Dados persistindo em: items.json
```

### Terminal 2 - Iniciar Frontend

```bash
cd frontend
npm run dev
```

**Esperado:**
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## ✅ Verificação Final

1. Abra o navegador em **http://localhost:5173**
2. Você deve ver:
   - Header com "📅 Agenda de Eventos"
   - Formulário com campos de título, tipo, status, descrição e data
   - Mensagem "Nenhum evento encontrado"
3. Preencha o formulário com um evento teste:
   - **Título**: Evento Teste
   - **Tipo**: Aula
   - **Status**: Ativo
4. Clique em "Criar Evento"
5. Você deve ver uma mensagem verde de sucesso e o evento aparecer na lista

---

## 🧪 Teste Rápido de API

Abra um TERCEIRO terminal e teste:

```bash
# Listar eventos
curl http://localhost:5000/items

# Ou acesse no navegador
# http://localhost:5000/items
```

---

## 🐛 Troubleshooting

### Erro: "Port already in use"

**Se a porta 5000 estiver em uso:**
```bash
# Encontre o processo usando a porta
lsof -i :5000

# E mate o processo (ou use outra porta)
```

**Se a porta 5173 estiver em uso:**
```bash
# Vite vai automaticamente usar 5174, 5175, etc
```

---

### Erro: "ModuleNotFoundError: No module named 'flask'"

```bash
# Certifique-se de estar na pasta backend
cd backend

# E reinstale as dependências
pip install -r requirements.txt
```

---

### Erro: "npm: command not found"

```bash
# Instale Node.js em: https://nodejs.org
# Ou no Windows use:
winget install OpenJS.NodeJS
```

---

## 📂 Estrutura de Arquivos Criada

```
python-react/
├── backend/
│   ├── app.py                 # ✅ Servidor Flask
│   ├── config.py              # ✅ Configurações
│   ├── requirements.txt        # ✅ Dependências Python
│   └── items.json             # ✅ Dados (criado automaticamente)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventForm.jsx  # ✅ Formulário
│   │   │   ├── EventList.jsx  # ✅ Lista
│   │   │   └── EventFilters.jsx # ✅ Filtros
│   │   ├── services/
│   │   │   └── eventService.js # ✅ Consumo de API
│   │   ├── App.jsx            # ✅ App principal
│   │   ├── App.css            # ✅ Estilos
│   │   ├── index.css          # ✅ Tailwind
│   │   ├── config.js          # ✅ Configuração
│   │   └── main.jsx           # ✅ Entry point
│   ├── package.json           # ✅ Dependências Node
│   ├── tailwind.config.js     # ✅ Config Tailwind
│   ├── postcss.config.js      # ✅ Config PostCSS
│   └── vite.config.js         # ✅ Config Vite
│
├── README.md                  # ✅ Documentação completa
└── EXEMPLOS_API.md            # ✅ Exemplos de requisições
```

---

## 📋 Checklist de Funcionalidades

Após rodar o projeto, teste:

- [ ] Criar novo evento
- [ ] Ver evento na lista
- [ ] Filtrar por tipo
- [ ] Filtrar por status
- [ ] Editar evento
- [ ] Alterar status (Concluir)
- [ ] Cancelar evento
- [ ] Deletar evento
- [ ] Ver mensagens de sucesso (verde)
- [ ] Tentar criar evento sem título (erro vermelho)

---

## 🎉 Parabéns!

Se você chegou aqui e tudo funcionou, seu projeto está pronto! 🚀

Para mais informações detalhadas, consulte o [README.md](README.md) ou [EXEMPLOS_API.md](EXEMPLOS_API.md).

---

## 📞 Dúvidas Comuns

**P: Onde os dados são salvos?**
R: Em `backend/items.json`

**P: Posso parar e reiniciar o servidor sem perder dados?**
R: Sim! Os dados são persistentes.

**P: Como alterar a porta do backend?**
R: Edite `backend/config.py` e mude `PORT = 5000`

**P: Como alterar a porta do frontend?**
R: Use `npm run dev -- --port 3000` (ex: porta 3000)

---

Desenvolvido em Janeiro de 2026 📚✨
