# Guia Básico de Uso do React

Este documento explica **como instalar e iniciar um projeto React**, além de **explicar para que serve cada arquivo/pasta principal** gerada.

---

## 1. Pré-requisitos

Antes de tudo, você precisa ter:

* **Node.js (LTS recomendado)**
* **npm** (vem junto com o Node) ou **yarn/pnpm**

Para verificar se está tudo instalado:

```bash
node -v
npm -v
```

Se não estiver instalado, baixe em: [https://nodejs.org](https://nodejs.org)

---

## 2. Criando um projeto React

### Opção recomendada (mais moderna): Vite + React

```bash
npm create vite@latest meu-projeto
```

Durante a instalação, escolha:

* Framework: **React**
* Variant: **JavaScript** ou **TypeScript**

Depois:

```bash
cd meu-projeto
npm install
npm run dev
```

O projeto abrirá normalmente em:

```
http://localhost:5173
```

---

## 3. Estrutura de pastas (Vite + React)

Após a criação, você verá algo parecido com isso:

```
meu-projeto/
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## 4. Para que serve cada arquivo/pasta

### 📁 node_modules/

* Contém **todas as dependências** do projeto
* É gerada automaticamente
* **Nunca** deve ser editada manualmente
* Não vai para o GitHub (fica no `.gitignore`)

---

### 📁 public/

* Arquivos públicos e estáticos
* Exemplo: ícones, imagens fixas, favicon
* O conteúdo aqui pode ser acessado diretamente pelo navegador

---

### 📁 src/

É o **coração do projeto React**.

#### 📁 assets/

* Imagens, SVGs, fontes, etc.

#### 📄 main.jsx

* **Ponto de entrada da aplicação**
* Aqui o React é ligado ao HTML

Exemplo:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

---

#### 📄 App.jsx

* Componente principal
* Onde normalmente começa a interface
* Pode conter outros componentes

Tudo em React é baseado em **componentes**.

---

#### 📄 index.css

* CSS global da aplicação
* Estilos gerais (fonte, body, reset, etc.)

---

### 📄 index.html

* Único HTML do projeto
* O React "injeta" toda a aplicação aqui
* Possui a `<div id="root"></div>`

---

### 📄 package.json

* Define:

  * Dependências
  * Scripts (`npm run dev`, `build`, etc.)
  * Nome e versão do projeto

Exemplo de scripts importantes:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

### 📄 vite.config.js

* Configurações do Vite
* Normalmente raramente alterado em projetos simples

---

## 5. Como o React funciona (resumo rápido)

* React usa **componentes**
* Componentes retornam **JSX** (HTML + JavaScript)
* A interface é atualizada automaticamente quando o estado muda

Exemplo simples de componente:

```jsx
function App() {
  return <h1>Olá, React!</h1>
}

export default App
```

---

## 6. Próximos passos recomendados

* Criar pasta `components/`
* Criar pasta `pages/` (se usar rotas)
* Aprender:

  * `useState`
  * `useEffect`
  * Props
  * React Router

---

## 7. Observação final

React **não é framework**, é uma **biblioteca** focada em interface.
Ele costuma ser usado junto com:

* APIs em **Python (Flask/Django/FastAPI)**
* Backends REST ou GraphQL

---

📌 Este guia é ideal para quem está começando ou revisando React do zero.
