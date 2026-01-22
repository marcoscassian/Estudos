from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
from config import TIPOS_PERMITIDOS, STATUS_PERMITIDOS, DATA_FILE, PORT, DEBUG

app = Flask(__name__)
CORS(app)

# ==================== FUNÇÕES AUXILIARES ====================

def carregar_items():
    """Carrega os eventos do arquivo JSON"""
    if not os.path.exists(DATA_FILE):
        return []
    
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def salvar_items(items):
    """Salva os eventos no arquivo JSON"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(items, f, indent=2, ensure_ascii=False)

def gerar_id():
    """Gera um novo ID (número inteiro sequencial)"""
    items = carregar_items()
    if not items:
        return 1
    return max(item['id'] for item in items) + 1

def validar_evento(dados, editar=False):
    """
    Valida os dados de um evento.
    Retorna (válido, mensagem_erro)
    """
    # Validação do título
    if 'titulo' not in dados or not dados['titulo']:
        return False, "titulo é obrigatório"
    
    if len(str(dados['titulo']).strip()) < 3:
        return False, "titulo é obrigatório e deve ter no mínimo 3 caracteres"
    
    # Validação do tipo
    if 'tipo' not in dados or not dados['tipo']:
        return False, "tipo é obrigatório"
    
    if dados['tipo'] not in TIPOS_PERMITIDOS:
        return False, f"tipo deve ser um de: {', '.join(TIPOS_PERMITIDOS)}"
    
    # Validação do status
    if 'status' not in dados or not dados['status']:
        return False, "status é obrigatório"
    
    if dados['status'] not in STATUS_PERMITIDOS:
        return False, f"status deve ser um de: {', '.join(STATUS_PERMITIDOS)}"
    
    # Validação da data (se fornecida)
    if 'data' in dados and dados['data']:
        try:
            datetime.strptime(dados['data'], '%Y-%m-%d')
        except ValueError:
            return False, "data deve estar no formato YYYY-MM-DD"
    
    return True, None

# ==================== ENDPOINTS ====================

@app.route('/items', methods=['GET'])
def get_items():
    """
    GET /items - Lista todos os eventos com filtros opcionais
    Query parameters:
    - tipo: filtrar por tipo de evento
    - status: filtrar por status do evento
    """
    items = carregar_items()
    
    # Aplicar filtros
    tipo_filtro = request.args.get('tipo')
    status_filtro = request.args.get('status')
    
    if tipo_filtro:
        items = [item for item in items if item.get('tipo') == tipo_filtro]
    
    if status_filtro:
        items = [item for item in items if item.get('status') == status_filtro]
    
    return jsonify(items), 200

@app.route('/items', methods=['POST'])
def create_item():
    """
    POST /items - Cria um novo evento
    Exemplo de corpo da requisição:
    {
        "titulo": "Aula de Programação",
        "tipo": "aula",
        "status": "ativo",
        "descricao": "Aula de Python",
        "data": "2026-02-01"
    }
    """
    dados = request.get_json()
    
    if not dados:
        return jsonify({"error": "Corpo da requisição vazio"}), 400
    
    # Validar
    valido, erro = validar_evento(dados)
    if not valido:
        return jsonify({"error": erro}), 400
    
    # Criar novo evento
    novo_evento = {
        "id": gerar_id(),
        "titulo": dados['titulo'].strip(),
        "tipo": dados['tipo'],
        "status": dados['status'],
        "descricao": dados.get('descricao', ''),
        "data": dados.get('data', '')
    }
    
    # Salvar
    items = carregar_items()
    items.append(novo_evento)
    salvar_items(items)
    
    return jsonify(novo_evento), 201

@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    """
    PUT /items/:id - Edita completamente um evento
    Exemplo de corpo:
    {
        "titulo": "Aula atualizada",
        "tipo": "aula",
        "status": "ativo",
        "descricao": "Nova descrição",
        "data": "2026-02-05"
    }
    """
    dados = request.get_json()
    
    if not dados:
        return jsonify({"error": "Corpo da requisição vazio"}), 400
    
    # Validar
    valido, erro = validar_evento(dados, editar=True)
    if not valido:
        return jsonify({"error": erro}), 400
    
    # Carregar e procurar o evento
    items = carregar_items()
    evento = next((item for item in items if item['id'] == item_id), None)
    
    if not evento:
        return jsonify({"error": "Evento não encontrado"}), 404
    
    # Atualizar
    evento['titulo'] = dados['titulo'].strip()
    evento['tipo'] = dados['tipo']
    evento['status'] = dados['status']
    evento['descricao'] = dados.get('descricao', '')
    evento['data'] = dados.get('data', '')
    
    salvar_items(items)
    
    return jsonify(evento), 200

@app.route('/items/<int:item_id>/status', methods=['PATCH'])
def update_status(item_id):
    """
    PATCH /items/:id/status - Altera apenas o status de um evento
    Exemplo de corpo:
    {
        "status": "concluido"
    }
    """
    dados = request.get_json()
    
    if not dados or 'status' not in dados:
        return jsonify({"error": "status é obrigatório"}), 400
    
    if dados['status'] not in STATUS_PERMITIDOS:
        return jsonify({"error": f"status deve ser um de: {', '.join(STATUS_PERMITIDOS)}"}), 400
    
    # Carregar e procurar o evento
    items = carregar_items()
    evento = next((item for item in items if item['id'] == item_id), None)
    
    if not evento:
        return jsonify({"error": "Evento não encontrado"}), 404
    
    # Atualizar status
    evento['status'] = dados['status']
    salvar_items(items)
    
    return jsonify(evento), 200

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    """
    DELETE /items/:id - Remove um evento
    """
    # Carregar e procurar o evento
    items = carregar_items()
    evento = next((item for item in items if item['id'] == item_id), None)
    
    if not evento:
        return jsonify({"error": "Evento não encontrado"}), 404
    
    # Remover
    items = [item for item in items if item['id'] != item_id]
    salvar_items(items)
    
    return jsonify({"message": "Evento removido com sucesso"}), 200

@app.route('/config', methods=['GET'])
def get_config():
    """
    GET /config - Retorna as configurações de tipos e status permitidos
    """
    return jsonify({
        "tipos": TIPOS_PERMITIDOS,
        "status": STATUS_PERMITIDOS
    }), 200

# ==================== INICIALIZAÇÃO ====================

if __name__ == '__main__':
    print(f"🚀 Servidor iniciado em http://localhost:{PORT}")
    print(f"📁 Dados persistindo em: {DATA_FILE}")
    app.run(debug=DEBUG, port=PORT, host='0.0.0.0')
