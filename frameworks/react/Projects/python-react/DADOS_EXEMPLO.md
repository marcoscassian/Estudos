# Dados de Exemplo para items.json

Quando você quiser testar rapidamente com dados pré-carregados, copie o conteúdo abaixo para `backend/items.json`:

```json
[
  {
    "id": 1,
    "titulo": "Aula de Programação em Python",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Introdução aos conceitos básicos de variáveis, tipos de dados e operadores",
    "data": "2026-02-01"
  },
  {
    "id": 2,
    "titulo": "Prova de Matemática",
    "tipo": "prova",
    "status": "ativo",
    "descricao": "Avaliação sobre cálculo diferencial e integral",
    "data": "2026-02-05"
  },
  {
    "id": 3,
    "titulo": "Reunião com o Coordenador Pedagógico",
    "tipo": "reuniao",
    "status": "concluido",
    "descricao": "Discussão sobre andamento do semestre",
    "data": "2026-01-20"
  },
  {
    "id": 4,
    "titulo": "Aula Prática de Laboratório",
    "tipo": "aula",
    "status": "ativo",
    "descricao": "Prática de desenvolvimiento de API REST em Flask",
    "data": "2026-02-03"
  },
  {
    "id": 5,
    "titulo": "Seminário de Tecnologia",
    "tipo": "outro",
    "status": "cancelado",
    "descricao": "Palestra sobre inteligência artificial",
    "data": "2026-02-08"
  }
]
```

## Como Usar

1. Abra o arquivo `backend/items.json`
2. Copie o conteúdo JSON acima
3. Cole no arquivo (substituindo o `[]` atual)
4. Salve o arquivo
5. Reinicie o backend se ele estiver rodando
6. Recarregue o navegador (frontend)
7. Agora você verá todos os eventos pré-carregados!

## O que Testrar com Esses Dados

- ✅ Ver a lista completa de eventos
- ✅ Filtrar por tipo "aula"
- ✅ Filtrar por status "ativo"
- ✅ Ver diferentes cores de status (verde, azul, vermelho)
- ✅ Ver diferentes cores de tipo (indigo, orange, purple, gray)
- ✅ Editar um evento
- ✅ Deletar um evento
- ✅ Mudar status para concluído

## Reset

Para voltar ao estado vazio, simplesmente coloque `[]` de volta no arquivo `items.json`.
