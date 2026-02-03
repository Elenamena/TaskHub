@echo off
title Lanzador TaskHub - Laravel + React
echo Arrancando motores de TaskHub...
 
:: 1. Arrancar el servidor de Laravel en una nueva ventana
start cmd /k "php artisan serve"
 
:: 2. Arrancar el compilador de Vite (React) en otra ventana
start cmd /k "npm run dev"
 
:: 3. Opcional: Abrir el navegador automáticamente tras 2 segundos
timeout /t 2 /nobreak >nul
start http://127.0.0.1:8000
 
echo Todo listo. No cierres las ventanas de comandos si quieres seguir trabajando.
pause