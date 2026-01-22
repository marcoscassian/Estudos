@echo off
REM Script para iniciar o Sistema de Agenda de Eventos no Windows
REM Este script abre dois terminais - um para o backend e outro para o frontend

echo.
echo ===============================================================
echo.
echo   ^:^:^:^:^:^: Sistema de Agenda de Eventos ^:^:^:^:^:
echo.
echo   Este script vai iniciar o Backend e Frontend...
echo.
echo ===============================================================
echo.

REM Verificar se estamos na pasta correta
if not exist "backend\" (
    echo ^^!^^! ERRO: Execute este script na pasta raiz do projeto
    echo.
    echo Esperado:
    echo   - backend\
    echo   - frontend\
    echo.
    pause
    exit /b 1
)

REM Iniciar Backend em um novo terminal
echo [1/2] Iniciando Backend (Python Flask)...
start cmd /k "cd backend && python app.py"

timeout /t 2 /nobreak

REM Iniciar Frontend em outro novo terminal
echo [2/2] Iniciando Frontend (React + Vite)...
start cmd /k "cd frontend && npm run dev"

timeout /t 2 /nobreak

echo.
echo ===============================================================
echo.
echo   ^!^!^! Espere enquanto os servidores iniciam ^!^!^!
echo.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo   O navegador sera aberto automaticamente em alguns segundos...
echo.
echo ===============================================================
echo.

timeout /t 5 /nobreak

REM Tentar abrir no navegador (Windows)
start http://localhost:5173

echo.
echo Tudo pronto! Se o navegador nao abrir, acesse manualmente:
echo http://localhost:5173
echo.
pause
