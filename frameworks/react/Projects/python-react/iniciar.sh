#!/bin/bash
# Script para iniciar o Sistema de Agenda de Eventos no Linux/Mac
# Este script abre dois terminais - um para o backend e outro para o frontend

echo ""
echo "=============================================================="
echo ""
echo "  :::  Sistema de Agenda de Eventos  :::"
echo ""
echo "  Este script vai iniciar o Backend e Frontend..."
echo ""
echo "=============================================================="
echo ""

# Verificar se estamos na pasta correta
if [ ! -d "backend" ]; then
    echo "!!! ERRO: Execute este script na pasta raiz do projeto"
    echo ""
    echo "Esperado:"
    echo "  - backend/"
    echo "  - frontend/"
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
fi

# Função para abrir terminal
open_terminal() {
    if [ "$(uname)" == "Darwin" ]; then
        # macOS - usar osascript
        osascript -e "tell app \"Terminal\" to do script \"$1\""
    else
        # Linux - tentar gnome-terminal, xterm, etc
        if command -v gnome-terminal &> /dev/null; then
            gnome-terminal -- bash -c "$1; exec bash"
        elif command -v xterm &> /dev/null; then
            xterm -e "$1" &
        else
            # Fallback - rodar no background
            ($1) &
        fi
    fi
}

# Iniciar Backend
echo "[1/2] Iniciando Backend (Python Flask)..."
cd backend
open_terminal "python app.py; read -p 'Pressione ENTER para fechar...'"
cd ..

sleep 2

# Iniciar Frontend
echo "[2/2] Iniciando Frontend (React + Vite)..."
cd frontend
open_terminal "npm run dev; read -p 'Pressione ENTER para fechar...'"
cd ..

sleep 5

# Tentar abrir no navegador
echo ""
echo "=============================================================="
echo ""
echo "  !!! Espere enquanto os servidores iniciam !!!"
echo ""
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:5173"
echo ""
echo "  Abrindo navegador..."
echo ""
echo "=============================================================="
echo ""

if [ "$(uname)" == "Darwin" ]; then
    # macOS
    open http://localhost:5173
else
    # Linux
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    elif command -v firefox &> /dev/null; then
        firefox http://localhost:5173 &
    elif command -v google-chrome &> /dev/null; then
        google-chrome http://localhost:5173 &
    fi
fi

echo "Se o navegador nao abrir, acesse manualmente:"
echo "http://localhost:5173"
echo ""
echo "Pressione CTRL+C para parar os servidores"
