#!/usr/bin/env python3
"""
Script de verificação de pré-requisitos para o Sistema de Agenda de Eventos
Execute este script para verificar se o ambiente está configurado corretamente
"""

import sys
import subprocess

def verificar_python():
    """Verifica versão do Python"""
    print("🐍 Verificando Python...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"   ✅ Python {version.major}.{version.minor}.{version.micro} encontrado")
        return True
    else:
        print(f"   ❌ Python 3.8+ necessário (você tem {version.major}.{version.minor})")
        return False

def verificar_pip():
    """Verifica se pip está instalado"""
    print("📦 Verificando pip...")
    try:
        result = subprocess.run([sys.executable, "-m", "pip", "--version"], 
                              capture_output=True, text=True)
        print(f"   ✅ {result.stdout.strip()}")
        return True
    except:
        print("   ❌ pip não encontrado")
        return False

def verificar_node():
    """Verifica se Node.js está instalado"""
    print("🟢 Verificando Node.js...")
    try:
        result = subprocess.run(["node", "--version"], 
                              capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"   ✅ Node.js {version} encontrado")
        return True
    except FileNotFoundError:
        print("   ❌ Node.js não encontrado")
        print("      Baixe em: https://nodejs.org")
        return False

def verificar_npm():
    """Verifica se npm está instalado"""
    print("📦 Verificando npm...")
    try:
        result = subprocess.run(["npm", "--version"], 
                              capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"   ✅ npm {version} encontrado")
        return True
    except FileNotFoundError:
        print("   ❌ npm não encontrado")
        print("      Instale junto com Node.js")
        return False

def verificar_flask():
    """Verifica se Flask está instalado"""
    print("🔧 Verificando Flask...")
    try:
        import flask
        print(f"   ✅ Flask {flask.__version__} instalado")
        return True
    except ImportError:
        print("   ❌ Flask não encontrado")
        print("      Execute: pip install -r backend/requirements.txt")
        return False

def verificar_estrutura():
    """Verifica estrutura de diretórios"""
    print("📁 Verificando estrutura de diretórios...")
    import os
    
    required_dirs = [
        'backend',
        'backend/items.json',
        'frontend',
        'frontend/src',
        'frontend/package.json'
    ]
    
    all_exist = True
    for dir_path in required_dirs:
        if os.path.exists(dir_path):
            print(f"   ✅ {dir_path} encontrado")
        else:
            print(f"   ❌ {dir_path} não encontrado")
            all_exist = False
    
    return all_exist

def main():
    """Executa todas as verificações"""
    print("=" * 60)
    print("🧪 VERIFICAÇÃO DE PRÉ-REQUISITOS")
    print("Sistema de Agenda de Eventos")
    print("=" * 60)
    print()
    
    checks = [
        verificar_python,
        verificar_pip,
        verificar_node,
        verificar_npm,
        verificar_estrutura,
        verificar_flask,
    ]
    
    results = []
    for check in checks:
        try:
            results.append(check())
        except Exception as e:
            print(f"   ❌ Erro ao verificar: {e}")
            results.append(False)
        print()
    
    # Resumo
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Resultado: {passed}/{total} verificações passaram")
    
    if all(results):
        print("✅ Ambiente pronto! Execute o projeto com:")
        print()
        print("   Terminal 1 (Backend):")
        print("   $ cd backend")
        print("   $ python app.py")
        print()
        print("   Terminal 2 (Frontend):")
        print("   $ cd frontend")
        print("   $ npm run dev")
        print()
        print("🎉 Abra http://localhost:5173 no navegador!")
    else:
        print("❌ Alguns pré-requisitos estão faltando")
        print("   Por favor, instale os componentes indicados acima")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
